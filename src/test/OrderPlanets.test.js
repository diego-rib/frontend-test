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

describe("Testa se a ordenação:", () => {
  it("alfabética 'name' | 'ASC' funciona corretamente", async () => {
    await act(async () => {
      render(<App />);
    });

    const planetsFind = await screen.findAllByTestId(/name/);
    const planetsNames = planetsFind.map((planet) => planet.innerHTML);

    const expectedPlanetOrder = ['Alderaan', 'Bespin', 'Coruscant', 'Dagobah', 'Endor', 'Hoth', 'Kamino', 'Naboo', 'Tatooine', 'Yavin IV'];

    expect(planetsNames).toEqual(expectedPlanetOrder);
  });

  it("alfabética 'climate' | 'DESC' funciona corretamente", async () => {
    await act(async () => {
      render(<App />);
    });

    const columnOrderSelector = await screen.findByRole('combobox', { name: /ordenar por/i });
    const [_sortAscRadio, sortDescRadio] = await screen.findAllByRole('radio');

    userEvent.selectOptions(columnOrderSelector, 'climate');
    userEvent.click(sortDescRadio);

    const planetsFind = await screen.findAllByTestId(/name/);
    const planetsNames = planetsFind.map((planet) => planet.innerHTML);

    const expectedPlanetOrder = ['Yavin IV', 'Alderaan', 'Bespin', 'Endor', 'Naboo', 'Coruscant', 'Kamino', 'Dagobah', 'Hoth', 'Tatooine'];

    expect(planetsNames).toEqual(expectedPlanetOrder);
  });

  it("numérica 'surface_water' | 'ASC' funciona corretamente", async () => {
    await act(async () => {
      render(<App />);
    });

    const columnOrderSelector = await screen.findByRole('combobox', { name: /ordenar por/i });
    const [sortAscRadio, _sortDescRadio] = await screen.findAllByRole('radio');

    userEvent.selectOptions(columnOrderSelector, 'surface_water');
    userEvent.click(sortAscRadio);

    const planetsFind = await screen.findAllByTestId(/name/);
    const planetsNames = planetsFind.map((planet) => planet.innerHTML);

    const expectedPlanetOrder = ['Coruscant', 'Bespin', 'Tatooine', 'Yavin IV', 'Dagobah', 'Endor', 'Naboo', 'Alderaan', 'Hoth', 'Kamino'];

    expect(planetsNames).toEqual(expectedPlanetOrder);
  });

  it("numérica 'gravity' | 'DESC' funciona corretamente", async () => {
    await act(async () => {
      render(<App />);
    });

    const columnOrderSelector = await screen.findByRole('combobox', { name: /ordenar por/i });
    const [_sortAscRadio, sortDescRadio] = await screen.findAllByRole('radio');

    userEvent.selectOptions(columnOrderSelector, 'gravity');
    userEvent.click(sortDescRadio);

    const planetsFind = await screen.findAllByTestId(/name/);
    const planetsNames = planetsFind.map((planet) => planet.innerHTML);

    const expectedPlanetOrder = ['Bespin', 'Hoth', 'Tatooine', 'Alderaan', 'Yavin IV', 'Naboo', 'Coruscant', 'Kamino', 'Endor', 'Dagobah'];

    expect(planetsNames).toEqual(expectedPlanetOrder);
  });

  describe("consegue realizar ordenações sequenciais:", () => {
    it("ordena com 'terrain' | 'DESC' e depois com 'terrain' | 'ASC' ", async () => {
      await act(async () => {
        render(<App />);
      });

      let planetsFind;
      let planetsNames;
      let expectedPlanetOrder;
  
      const columnOrderSelector = await screen.findByRole('combobox', { name: /ordenar por/i });
      const [sortAscRadio, sortDescRadio] = await screen.findAllByRole('radio');
  
      // Primeira ordenação
      userEvent.selectOptions(columnOrderSelector, 'terrain');
      userEvent.click(sortDescRadio);
  
      planetsFind = await screen.findAllByTestId(/name/);
      planetsNames = planetsFind.map((planet) => planet.innerHTML);
  
      expectedPlanetOrder = ['Hoth', 'Dagobah', 'Kamino', 'Yavin IV', 'Naboo', 'Alderaan', 'Bespin', 'Endor', 'Tatooine', 'Coruscant'];
  
      expect(planetsNames).toEqual(expectedPlanetOrder);

      // Segunda ordenação
      userEvent.selectOptions(columnOrderSelector, 'terrain');
      userEvent.click(sortAscRadio);
  
      planetsFind = await screen.findAllByTestId(/name/);
      planetsNames = planetsFind.map((planet) => planet.innerHTML);
  
      expectedPlanetOrder = ['Coruscant', 'Tatooine', 'Endor', 'Bespin', 'Alderaan', 'Naboo', 'Yavin IV', 'Kamino', 'Dagobah', 'Hoth'];
  
      expect(planetsNames).toEqual(expectedPlanetOrder);
    });
  });
});
