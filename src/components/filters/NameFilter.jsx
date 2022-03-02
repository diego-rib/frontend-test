import React from 'react';
import { usePlanetsContext } from '../../context/PlanetsContext';

import '../../styles/NameFilter.css';

function NameFilter() {
  const {
    filters: { filterByName: { name } },
    setNameFilter,
  } = usePlanetsContext();

  return (
    <div className="name-filter">
      <label htmlFor="nameFilter">
        Filtrar por nome:
        <input
          type="text"
          name="nameFilter"
          id="nameFilter"
          value={ name }
          onChange={ ({ target }) => setNameFilter(target.value) }
        />
      </label>
    </div>
  );
}

export default NameFilter;
