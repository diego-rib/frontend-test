import React from 'react';
import { usePlanetsContext } from '../context/PlanetsContext';

function FilterList() {
  const {
    filters: { filterByNumericValues },
    removeFilter,
  } = usePlanetsContext();

  if (filterByNumericValues.length === 0) {
    return null;
  }

  return (
    <div>
      <h3>Filtros utilizados:</h3>
      {
        filterByNumericValues.map((filter, index) => (
          <div key={ `used-filter-${index}` }>
            <button
              type="button"
              onClick={ () => removeFilter(index) }
            >
              X
            </button>
            <p>{filter.column}</p>
            <p>{filter.comparison}</p>
            <p>{filter.value}</p>
          </div>
        ))
      }
    </div>
  );
}

export default FilterList;
