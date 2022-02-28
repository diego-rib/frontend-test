import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { PlanetsContext } from './PlanetsContext';

import getAllPlanets from '../helpers/planetsApi';

function PlanetsContextProvider({ children }) {
  const [data, setData] = useState([]);
  const [rawData, setRawData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fields, setFields] = useState([]);

  // Estado dos filtros
  const [nameFilter, setNameFilter] = useState('');

  const [error, setError] = useState(false);

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

  useEffect(() => {
    if (nameFilter.trim() === '') {
      setData(rawData);
      return;
    }

    const filteredPlanets = rawData
      .filter(({ name: planetName }) => planetName.includes(nameFilter));

    setData(filteredPlanets);
  }, [rawData, nameFilter]);

  const contextValue = {
    data,
    fields,
    loading,
    error,
    filters: {
      filterByName: {
        name: nameFilter,
      },
    },
    setNameFilter,
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
