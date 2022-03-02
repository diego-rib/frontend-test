import React from 'react';
import { usePlanetsContext } from '../../context/PlanetsContext';

import '../../styles/OrderPlanets.css';

function OrderPlanets() {
  const {
    filters: { order: { column, sort } },
    setOrderColumn,
    setOrderSort,
    fields,
  } = usePlanetsContext();

  return (
    <div className="order-planets-filter">
      <label htmlFor="order-column">
        Ordenar por
        <select
          id="order-column"
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
      </label>
      <label htmlFor="ASC">
        <input
          type="radio"
          name="sort"
          id="ASC"
          value="ASC"
          onChange={ () => setOrderSort('ASC') }
          checked={ sort === 'ASC' }
        />
        Crescente
      </label>
      <label htmlFor="DESC">
        <input
          type="radio"
          name="sort"
          id="DESC"
          value="DESC"
          onChange={ () => setOrderSort('DESC') }
          checked={ sort === 'DESC' }
        />
        Decrescente
      </label>
    </div>
  );
}

export default OrderPlanets;
