import React, { useState } from 'react';
import { usePlanetsContext } from '../../context/PlanetsContext';

function NumericFilter() {
  const { avaliableColumns, submitNumericFilter } = usePlanetsContext();

  const [column, setColumn] = useState('');
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState(0);
  const [warning, setWarning] = useState(false);

  // Volta o componente ao estado inicial
  function resetFilterState() {
    setWarning(false);
    setColumn('');
    setComparison('maior que');
    setValue(0);
  }

  function submitFilters() {
    if (column === '') {
      setWarning(true);
      return;
    }

    resetFilterState();
    submitNumericFilter({ column, comparison, value });
  }

  if (avaliableColumns.length === 0) {
    return <h1>Todos os filtros foram utilizados</h1>;
  }

  return (
    <div>
      <label htmlFor="column">
        Filtrar por coluna:
        <select
          id="column"
          onChange={ ({ target }) => setColumn(target.value) }
          value={ column }
        >
          <option value="">{}</option>
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
      { warning && <p>Insira uma coluna a ser filtrada</p> }
    </div>
  );
}

export default NumericFilter;
