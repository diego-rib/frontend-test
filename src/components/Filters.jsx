import React from 'react';
import { usePlanetsContext } from '../context/PlanetsContext';
import FilterList from './FilterList';

import NameFilter from './NameFilter';
import NumericFilter from './NumericFilter';

function Filters() {
  const { resetAllFilters } = usePlanetsContext();

  return (
    <div>
      <NameFilter />
      <button type="button" onClick={ resetAllFilters }>
        Reseta filtros
      </button>
      <FilterList />
      <NumericFilter />
    </div>
  );
}

export default Filters;
