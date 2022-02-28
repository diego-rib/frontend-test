import React from 'react';

import PlanetsContextProvider from './context/PlanetsContextProvider';

import PlanetsTable from './components/PlanetsTable';
import NameFilter from './components/NameFilter';

function App() {
  return (
    <PlanetsContextProvider>
      <div>
        <h1>Star Wars Planets</h1>
        <NameFilter />
        <PlanetsTable />
      </div>
    </PlanetsContextProvider>
  );
}

export default App;
