async function getAllPlanets({ setData, setLoading, setError }) {
  try {
    setLoading(true);
    const url = 'https://swapi-trybe.herokuapp.com/api/planets/';

    const rawData = await fetch(url);
    const data = await rawData.json();

    setData(data.results);
    setLoading(false);
  } catch (error) {
    console.log(error);
    setError(true);
  }
}

export default getAllPlanets;
