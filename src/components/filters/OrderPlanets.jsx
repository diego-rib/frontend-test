import React from 'react';
import { usePlanetsContext } from '../../context/PlanetsContext';

function OrderPlanets() {
  const {
    filters: { order: { column, sort } },
    setOrderColumn,
    setOrderSort,
    fields,
  } = usePlanetsContext();

  return (
    <div>
      <select
        onChange={ ({ target }) => setOrderColumn(target.value) }
        value={ column }
      >
        { fields.map((field) => (
          <option
            key={ `order-${field}` }
            value={ field }
          >
            {field}
          </option>
        )) }
      </select>
      <label htmlFor="ASC">
        Ascending
        <input
          type="radio"
          name="sort"
          id="ASC"
          value="ASC"
          onChange={ () => setOrderSort('ASC') }
          checked={ sort === 'ASC' }
        />
      </label>
      <label htmlFor="DESC">
        Descending
        <input
          type="radio"
          name="sort"
          id="DESC"
          value="DESC"
          onChange={ () => setOrderSort('DESC') }
          checked={ sort === 'DESC' }
        />
      </label>
    </div>
  );
}

export default OrderPlanets;
