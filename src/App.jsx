import React from 'react';

import PlanetsContextProvider from './context/PlanetsContextProvider';

import PlanetsTable from './components/PlanetsTable';
import Filters from './components/Filters';

function App() {
  return (
    <PlanetsContextProvider>
      <div>
        <h1>Star Wars Planets</h1>
        <Filters />
        <PlanetsTable />
      </div>
    </PlanetsContextProvider>
  );
}

export default App;
