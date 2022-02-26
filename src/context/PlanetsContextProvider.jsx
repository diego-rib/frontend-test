import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { PlanetsContext } from './PlanetsContext';

function PlanetsContextProvider({ children }) {
  const [data, setData] = useState([]);

  const contextValue = {
    data,
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
