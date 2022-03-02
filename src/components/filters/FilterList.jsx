import React from 'react';
import { RiDeleteBin2Line } from 'react-icons/ri';

import { usePlanetsContext } from '../../context/PlanetsContext';

import '../../styles/FilterList.css';

function FilterList() {
  const {
    filters: { filterByNumericValues },
    removeFilter,
  } = usePlanetsContext();

  if (filterByNumericValues.length === 0) {
    return null;
  }

  return (
    <div className="filters-list-container">
      <h3>Filtros utilizados:</h3>
      <div className="all-used-filters-list">
        {
          filterByNumericValues.map((filter, index) => (
            <div
              key={ `used-filter-${index}` }
              data-testid={ `used-filter-${filter.column}` }
              className="filters-list-filter-info"
            >
              <p>{`${filter.column} ${filter.comparison} ${filter.value}`}</p>
              <button
                type="button"
                className="remove-filter-button"
                onClick={ () => removeFilter(index) }
              >
                <RiDeleteBin2Line color="white" size="22px" />
              </button>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default FilterList;
