import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { PlanetsContext } from './PlanetsContext';

import getAllPlanets from '../helpers/planetsApi';
import filterByColumns from '../helpers/filterPlanets';

const allColumns = [
  'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'];

function PlanetsContextProvider({ children }) {
  const [data, setData] = useState([]);
  const [rawData, setRawData] = useState([]);
  const [fields, setFields] = useState([]);

  // Mensagem de carregamento
  const [loading, setLoading] = useState(true);

  // Mensagem de erro
  const [error, setError] = useState(false);

  // Estado dos filtros
  const [nameFilter, setNameFilter] = useState('');

  // Filtros numéricos
  const [avaliableColumns, setAvaliableColumns] = useState([]);
  const [filterByNumericValues, setNumericFilters] = useState([]);

  // Adiciona um novo filtro numérico
  function submitNumericFilter(numericFilter) {
    const newNumericFilters = [...filterByNumericValues, numericFilter];

    setNumericFilters(newNumericFilters);
  }

  // Remove filtro selecionado
  function removeFilter(filterIndex) {
    const newFiltersList = filterByNumericValues
      .filter((_filter, index) => index !== filterIndex);
    setNumericFilters(newFiltersList);
  }

  // Reseta todos os filtros numéricos
  function resetAllFilters() {
    setNumericFilters([]);
  }

  // Pega os dados da api quando o componente é montado
  useEffect(() => {
    getAllPlanets({ setData, setLoading, setError });
  }, []);

  // Seta todos os campos baseado no retorno da api
  useEffect(() => {
    // Se os campos ja estiverem setados ou ainda não ter um retorno da api
    // não faz nada
    if (fields.length > 0 || data.length === 0) {
      return;
    }
    const allFields = Object.keys(data[0]).filter(
      (field) => field !== 'residents',
    );
    setFields(allFields);
    setRawData(data);
  }, [data, fields]);

  // Executa os filtros por nome do planeta
  // e os filtros numéricos
  useEffect(() => {
    let planetsData = rawData;

    if (nameFilter.trim() !== '') {
      planetsData = planetsData
        .filter(({ name: planetName }) => planetName.includes(nameFilter));
    }

    if (filterByNumericValues.length >= 1) {
      planetsData = filterByColumns(planetsData, filterByNumericValues);
    }

    setData(planetsData);
  }, [rawData, nameFilter, filterByNumericValues]);

  // Atualiza os campos disponíveis para serem usados
  useEffect(() => {
    const usedColumns = filterByNumericValues
      .map(({ column }) => column);

    const unusedColumns = allColumns
      .filter((column) => !usedColumns.includes(column));

    setAvaliableColumns(unusedColumns);
  }, [filterByNumericValues]);

  const contextValue = {
    data,
    fields,
    loading,
    error,
    filters: {
      filterByName: {
        name: nameFilter,
      },
      filterByNumericValues,
    },
    setNameFilter,
    avaliableColumns,
    submitNumericFilter,
    removeFilter,
    resetAllFilters,
  };

  return (
    <PlanetsContext.Provider value={ contextValue }>
      {children}
    </PlanetsContext.Provider>
  );
}

export default PlanetsContextProvider;

PlanetsContextProvider.propTypes = {
  children: PropTypes.element,
}.isRequired;
