import { screen, within } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import customRender from './utils/customRender';
import apiMock from './utils/apiMock';
import filteredData from './utils/filteredApiData';

import PlanetsTable from '../components/PlanetsTable';

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

describe("Testa se o componente PlanetsTable:", () => {
  it("faz uma requisição a API", async () => {
    await act(async () => {
      customRender(<PlanetsTable />);
    });

    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledWith('https://swapi-trybe.herokuapp.com/api/planets/');
  });

  it("renderiza todas as colunas exceto 'residents'", async () => {
    customRender(<PlanetsTable />);

    const columnHeaders = await screen.findAllByRole('columnheader');

    const hasResidentsColumn = columnHeaders.includes('residents');
    expect(hasResidentsColumn).toBeFalsy();

    expect(columnHeaders.length).toBe(13);
  });

  it("renderiza uma linha para cada um dos 10 planetas", async () => {
    customRender(<PlanetsTable />);

    const planetRows = await screen.findAllByTestId(/planet-row/);

    expect(planetRows.length).toBe(10);
  });

  it("renderiza a informação correta dos planetas", async () => {
    customRender(<PlanetsTable />);

    const planets = filteredData;

    for (let planet of planets) {
      const planetRow = await screen.findByTestId(`planet-row-${planet.name}`);

      const name = await within(planetRow).findByText(planet.name);
      const rotationPeriod = await within(planetRow).findByText(planet.rotation_period);
      const orbitalPeriod = await within(planetRow).findByText(planet.orbital_period);
      const diameter = await within(planetRow).findByText(planet.diameter);
      const climate = await within(planetRow).findByText(planet.climate);
      const gravity = await within(planetRow).findByText(planet.gravity);
      const terrain = await within(planetRow).findByText(planet.terrain);
      const surfaceWater = await within(planetRow).findByText(planet.surface_water);
      const population = await within(planetRow).findByText(planet.population);

      expect(name).toBeInTheDocument();
      expect(rotationPeriod).toBeInTheDocument();
      expect(orbitalPeriod).toBeInTheDocument();
      expect(diameter).toBeInTheDocument();
      expect(climate).toBeInTheDocument();
      expect(gravity).toBeInTheDocument();
      expect(terrain).toBeInTheDocument();
      expect(surfaceWater).toBeInTheDocument();
      expect(population).toBeInTheDocument();
    }
  });

  it("renderiza a mensagem de erro corretamente", async () => {
    global.fetch = jest.fn(() => Promise.reject());

    customRender(<PlanetsTable />);

    const errorMessage = await screen.findByText('Houve um erro ao se conectar com o servidor.');

    expect(errorMessage).toBeInTheDocument();
  });
});
