import React from 'react';

import PlanetsContextProvider from './context/PlanetsContextProvider';

import PlanetsTable from './components/PlanetsTable';

function App() {
  return (
    <PlanetsContextProvider>
      <div>
        <h1>Star Wars Planets</h1>
        <PlanetsTable />
      </div>
    </PlanetsContextProvider>
  );
}

export default App;
