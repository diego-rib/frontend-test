import React from 'react';
import { usePlanetsContext } from '../context/PlanetsContext';

import NameFilter from './NameFilter';
import NumericFilter from './NumericFilter';

function Filters() {
  const { resetAllFilters } = usePlanetsContext();

  return (
    <div>
      <button type="button" onClick={ resetAllFilters }>
        Reseta filtros
      </button>
      <NameFilter />
      <NumericFilter />
    </div>
  );
}

export default Filters;
