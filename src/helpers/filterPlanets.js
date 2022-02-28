function comparisonMethod(column, comparisonKey, value) {
  const columnNumber = parseInt(column, 10);
  const valueNumber = parseInt(value, 10);

  const options = {
    'maior que': columnNumber > valueNumber,
    'menor que': columnNumber < valueNumber,
    'igual a': columnNumber === valueNumber,
  };

  return options[comparisonKey];
}

function filterPlanets(planets, { column, comparison, value }) {
  return planets.filter((planet) => (
    comparisonMethod(planet[column], comparison, value)
  ));
}

function filterByColumns(planets, allFilters) {
  let filteredPlanets = planets;

  for (let i = 0; i < allFilters.length; i += 1) {
    filteredPlanets = filterPlanets(filteredPlanets, allFilters[i]);
  }

  return filteredPlanets;
}

export default filterByColumns;
