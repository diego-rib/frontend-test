import React from 'react';
import { usePlanetsContext } from '../context/PlanetsContext';

import '../styles/Filters.css';

import NameFilter from './filters/NameFilter';
import FilterList from './filters/FilterList';
import NumericFilter from './filters/NumericFilter';
import OrderPlanets from './filters/OrderPlanets';

function Filters() {
  const { resetAllFilters } = usePlanetsContext();

  return (
    <div className="filters-section">
      <FilterList />
      <div className="filters-container">
        <button
          type="button"
          onClick={ resetAllFilters }
          className="reset-all-filters-button"
        >
          Reseta filtros
        </button>
        <div className="numeric-order-filters-wrapper">
          <NameFilter />
          <NumericFilter />
          <OrderPlanets />
        </div>
      </div>
    </div>
  );
}

export default Filters;
