import React from 'react';
import { usePlanetsContext } from '../context/PlanetsContext';
import FilterList from './filters/FilterList';

import NameFilter from './filters/NameFilter';
import NumericFilter from './filters/NumericFilter';
import OrderPlanets from './filters/OrderPlanets';

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
      <OrderPlanets />
    </div>
  );
}

export default Filters;
