import React, { useState } from 'react';
import { usePlanetsContext } from '../context/PlanetsContext';

function NumericFilter() {
  const { avaliableColumns, submitNumericFilter } = usePlanetsContext();

  const [column, setColumn] = useState('');
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState(0);

  function submitFilters() {
    submitNumericFilter({ column, comparison, value });
    setColumn('');
    setComparison('maior que');
    setValue(0);
  }

  if (column === '' && avaliableColumns.length > 0) {
    setColumn(avaliableColumns[0]);
  }

  return (
    <div>
      <label htmlFor="column">
        Filtrar por coluna:
        <select
          id="column"
          onChange={ ({ target }) => setColumn(target.value) }
        >
          {
            avaliableColumns.map((avaliableColumn) => (
              <option
                value={ avaliableColumn }
                key={ `column-filter-${avaliableColumn}` }
              >
                {avaliableColumn}
              </option>
            ))
          }
        </select>
      </label>
      <label htmlFor="comparison">
        comparação:
        <select
          id="comparison"
          onChange={ ({ target }) => setComparison(target.value) }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
      </label>
      <label htmlFor="value">
        valor:
        <input
          id="value"
          type="number"
          value={ value }
          onChange={ ({ target }) => setValue(target.value) }
        />
      </label>
      <button
        type="button"
        onClick={ submitFilters }
      >
        Filtrar
      </button>
    </div>
  );
}

export default NumericFilter;
