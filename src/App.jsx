import React from 'react';

import PlanetsContextProvider from './context/PlanetsContextProvider';

function App() {
  return (
    <PlanetsContextProvider>
      <div>
        <h1>Star Wars Planets</h1>
      </div>
    </PlanetsContextProvider>
  );
}

export default App;
