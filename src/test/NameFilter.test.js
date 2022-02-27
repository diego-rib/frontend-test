import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

import apiMock from './apiMock';

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

describe("Testa se o filtro por nome quando:", () => {
  describe("consegue realizar buscas sequenciais", () => {
    beforeEach(async () => {
      await act(async () => { render(<App />) });
    });

    it("input com 'o' retorna 7 planetas", async () => {
      const nameFilterInput = await screen.findByLabelText(/filtrar por nome/i);

      // verifica a quantidade de planetas que contém a string 'o'
      userEvent.type(nameFilterInput, 'o');
      const planetsFind = await screen.findAllByTestId(/planet-row/);
  
      expect(planetsFind.length).toBe(7);
    });

    it("input com 'oo' retorna 2 planetas", async () => {
      const nameFilterInput = await screen.findByLabelText(/filtrar por nome/i);

      // verifica a quantidade de planetas que contém a string 'oo'
      userEvent.type(nameFilterInput, 'oo');
      const planetsFind = await screen.findAllByTestId(/planet-row/);
  
      expect(planetsFind.length).toBe(2);
    });

    it("input voltando a ficar vazio retorna todos os planetas", async () => {
      const nameFilterInput = await screen.findByLabelText(/filtrar por nome/i);

      // verifica se volta a ter todos os planetas quando o input volta a ficar vazio
      userEvent.type(nameFilterInput, 'xablau');
      userEvent.type(nameFilterInput, '{selectall}{backspace}');

      const planetsFind = await screen.findAllByTestId(/planet-row/);
  
      expect(planetsFind.length).toBe(10);
    });
  });

  it("verifica se não aparece nenhum planeta ao digitar nome inexistente", async () => {
    render(<App />);

    const nameFilterInput = await screen.findByLabelText(/filtrar por nome/i);

    userEvent.type(nameFilterInput, 'xablau');

    const planetsFind = screen.queryByTestId(/planet-row/);

    expect(planetsFind).toBeNull();
  });
});
