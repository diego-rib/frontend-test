import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

import apiMock from './utils/apiMock';

import App from '../App';

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(apiMock),
    })
  );
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("Testa se o filtro numérico:", () => {
  describe("renderiza o:", () => {
    it("select para coluna", async () => {
      render(<App />);

      const columnSelect = await screen.findByRole('combobox', { name: /filtrar por coluna:/i });

      expect(columnSelect).toBeInTheDocument();
    });

    it("select para comparação", async () => {
      render(<App />);

      const comparisonSelect = await screen.findByRole('combobox', { name: /comparação:/i });

      expect(comparisonSelect).toBeInTheDocument();
    });
  
    it("input para value", async () => {
      render(<App />);

      const valueInput = await screen.findByRole('spinbutton', { name: /valor:/i });

      expect(valueInput).toBeInTheDocument();
    });

    it("botão de submissão do filtro", async () => {
      render(<App />);

      const filterButton = await screen.findByRole('button', { name: /filtrar/i });

      expect(filterButton).toBeInTheDocument();
    });

    it("botão de reset de filtros", async () => {
      render(<App />);

      const resetFilterButton = await screen.findByRole('button', { name: /reseta filtros/i });

      expect(resetFilterButton).toBeInTheDocument();
    });
  });

  describe("é capaz de realizar a busca usando o filtro:", () => {
    it("'population' | 'maior que' | '5000'", async () => {
      await act(async () => {
        render(<App />);
      });
  
      const columnSelect = await screen.findByRole('combobox', { name: /filtrar por coluna:/i });
      const comparisonSelect = await screen.findByRole('combobox', { name: /comparação:/i });
      const valueInput = await screen.findByRole('spinbutton', { name: /valor:/i });
      const filterButton = await screen.findByRole('button', { name: /filtrar/i });

      userEvent.selectOptions(columnSelect, 'population');
      userEvent.selectOptions(comparisonSelect, 'maior que');
      userEvent.type(valueInput, '5000');
      userEvent.click(filterButton);

      const planetsFind = screen.queryAllByTestId(/planet-row/);

      expect(planetsFind.length).toBe(7);
    });

    it("'rotation_period' | 'menor que' | '21'", async () => {
      await act(async () => {
        render(<App />);
      });

      const columnSelect = await screen.findByRole('combobox', { name: /filtrar por coluna:/i });
      const comparisonSelect = await screen.findByRole('combobox', { name: /comparação:/i });
      const valueInput = await screen.findByRole('spinbutton', { name: /valor:/i });
      const filterButton = await screen.findByRole('button', { name: /filtrar/i });

      userEvent.selectOptions(columnSelect, 'rotation_period');
      userEvent.selectOptions(comparisonSelect, 'menor que');
      userEvent.type(valueInput, '21');
      userEvent.click(filterButton);

      const planetsFind = screen.queryAllByTestId(/planet-row/);      
      expect(planetsFind.length).toBe(2);

      const firstPlanetName = await within(planetsFind[0]).findByText(/bespin/i);
      expect(firstPlanetName).toBeInTheDocument();

      const secondPlanetName = await within(planetsFind[1]).findByText(/endor/i);
      expect(secondPlanetName).toBeInTheDocument();
    });

    it("'diameter' | 'igual a' | '10200'", async () => {
      await act(async () => {
        render(<App />);
      });

      const columnSelect = await screen.findByRole('combobox', { name: /filtrar por coluna:/i });
      const comparisonSelect = await screen.findByRole('combobox', { name: /comparação:/i });
      const valueInput = await screen.findByRole('spinbutton', { name: /valor:/i });
      const filterButton = await screen.findByRole('button', { name: /filtrar/i });

      userEvent.selectOptions(columnSelect, 'diameter');
      userEvent.selectOptions(comparisonSelect, 'igual a');
      userEvent.type(valueInput, '10200');
      userEvent.click(filterButton);

      const planetsFind = screen.queryAllByTestId(/planet-row/);      
      expect(planetsFind.length).toBe(1);

      const planetName = await within(planetsFind[0]).findByText(/yavin iv/i);
      expect(planetName).toBeInTheDocument();
    });
  });

  describe("impede de realizar buscas quando:", () => {
    it("o campo coluna está vazio", async () => {
      await act(async () => {
        render(<App />);
      });
  
      const columnSelect = await screen.findByRole('combobox', { name: /filtrar por coluna:/i });
      const comparisonSelect = await screen.findByRole('combobox', { name: /comparação:/i });
      const valueInput = await screen.findByRole('spinbutton', { name: /valor:/i });
      const filterButton = await screen.findByRole('button', { name: /filtrar/i });

      userEvent.selectOptions(columnSelect, '');
      userEvent.selectOptions(comparisonSelect, 'maior que');
      userEvent.type(valueInput, '5000');
      userEvent.click(filterButton);

      const warningMessage = await screen.findByText(/insira uma coluna a ser filtrada/i);

      expect(warningMessage).toBeInTheDocument();
    });
  });

  describe("consegue remover filtros:", () => {
    it("aplica filtro e remove ele usando o botão de remoção", async () => {
      await act(async () => {
        render(<App />);
      });

      let usedFilters;

      const columnSelect = await screen.findByRole('combobox', { name: /filtrar por coluna:/i });
      const comparisonSelect = await screen.findByRole('combobox', { name: /comparação:/i });
      const valueInput = await screen.findByRole('spinbutton', { name: /valor:/i });
      const filterButton = await screen.findByRole('button', { name: /filtrar/i });

      userEvent.selectOptions(columnSelect, 'population');
      userEvent.selectOptions(comparisonSelect, 'maior que');
      userEvent.type(valueInput, '5000');
      userEvent.click(filterButton);

      usedFilters = await screen.findAllByTestId(/used-filter/i);
      expect(usedFilters.length).toBe(1);

      const removeFilterButton = await screen.findByRole('button', { name: /x/i });

      userEvent.click(removeFilterButton);

      usedFilters = screen.queryByTestId(/used-filter/i);
      expect(usedFilters).toBeNull();
    });

    it("filtragem é feita corretamente ao remover um filtro", async () => {
      await act(async () => {
        render(<App />);
      });

      let planetsFind;

      const columnSelect = await screen.findByRole('combobox', { name: /filtrar por coluna:/i });
      const comparisonSelect = await screen.findByRole('combobox', { name: /comparação:/i });
      const valueInput = await screen.findByRole('spinbutton', { name: /valor:/i });
      const filterButton = await screen.findByRole('button', { name: /filtrar/i });

      userEvent.selectOptions(columnSelect, 'population');
      userEvent.selectOptions(comparisonSelect, 'maior que');
      userEvent.type(valueInput, '20000');
      userEvent.click(filterButton);

      userEvent.selectOptions(columnSelect, 'rotation_period');
      userEvent.selectOptions(comparisonSelect, 'menor que');
      userEvent.type(valueInput, '24');
      userEvent.click(filterButton);

      planetsFind = await screen.findAllByTestId(/planet-row/);
      expect(planetsFind.length).toBe(3);

      const populationFilterContainer = await screen.findByTestId(/used-filter-population/);
      const removeFilterButton = await within(populationFilterContainer).findByRole('button');
      userEvent.click(removeFilterButton);

      planetsFind = await screen.findAllByTestId(/planet-row/);      
      expect(planetsFind.length).toBe(5);
    });
  });

  describe("consegue resetar todos os filtros", () => {
    it("pelo botão de resetar filtros", async () => {
      await act(async () => {
        render(<App />);
      });

      let planetsFind;
  
      const columnSelect = await screen.findByRole('combobox', { name: /filtrar por coluna:/i });
      const comparisonSelect = await screen.findByRole('combobox', { name: /comparação:/i });
      const valueInput = await screen.findByRole('spinbutton', { name: /valor:/i });
      const filterButton = await screen.findByRole('button', { name: /filtrar/i });
      const resetFilterButton = await screen.findByRole('button', { name: /reseta filtros/i });

      userEvent.selectOptions(columnSelect, 'population');
      userEvent.selectOptions(comparisonSelect, 'maior que');
      userEvent.type(valueInput, '20000');
      userEvent.click(filterButton);

      userEvent.selectOptions(columnSelect, 'rotation_period');
      userEvent.selectOptions(comparisonSelect, 'menor que');
      userEvent.type(valueInput, '24');
      userEvent.click(filterButton);

      planetsFind = screen.queryAllByTestId(/planet-row/);
      expect(planetsFind.length).toBe(3);

      userEvent.click(resetFilterButton);

      planetsFind = screen.queryAllByTestId(/planet-row/);

      expect(planetsFind.length).toBe(10);
    })
  });

  describe("exibe a lista de filtros usados corretamente caso:", () => {
    it("nenhum filtro seja selecionado", async () => {
      await act(async () => {
        render(<App />);
      });

      const usedFilters = screen.queryByTestId(/used-filter/);

      expect(usedFilters).toBeNull();
    });

    it("tenha apenas um filtro selecionado", async () => {
      await act(async () => {
        render(<App />);
      });
  
      const columnSelect = await screen.findByRole('combobox', { name: /filtrar por coluna:/i });
      const comparisonSelect = await screen.findByRole('combobox', { name: /comparação:/i });
      const valueInput = await screen.findByRole('spinbutton', { name: /valor:/i });
      const filterButton = await screen.findByRole('button', { name: /filtrar/i });

      userEvent.selectOptions(columnSelect, 'population');
      userEvent.selectOptions(comparisonSelect, 'maior que');
      userEvent.type(valueInput, '5000');
      userEvent.click(filterButton);

      const usedFilters = await screen.findAllByTestId(/used-filter/i);

      expect(usedFilters.length).toBe(1);
    });

    it("tenha três filtros selecionados", async () => {
      await act(async () => {
        render(<App />);
      });
  
      const columnSelect = await screen.findByRole('combobox', { name: /filtrar por coluna:/i });
      const comparisonSelect = await screen.findByRole('combobox', { name: /comparação:/i });
      const valueInput = await screen.findByRole('spinbutton', { name: /valor:/i });
      const filterButton = await screen.findByRole('button', { name: /filtrar/i });

      userEvent.selectOptions(columnSelect, 'population');
      userEvent.selectOptions(comparisonSelect, 'maior que');
      userEvent.type(valueInput, '5000');
      userEvent.click(filterButton);

      userEvent.selectOptions(columnSelect, 'rotation_period');
      userEvent.selectOptions(comparisonSelect, 'menor que');
      userEvent.type(valueInput, '21');
      userEvent.click(filterButton);

      userEvent.selectOptions(columnSelect, 'diameter');
      userEvent.selectOptions(comparisonSelect, 'igual a');
      userEvent.type(valueInput, '10200');
      userEvent.click(filterButton);

      const usedFilters = await screen.findAllByTestId(/used-filter/i);

      expect(usedFilters.length).toBe(3);
    });
  });
});
