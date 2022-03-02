import React from 'react';
import './styles/App.css';

import PlanetsContextProvider from './context/PlanetsContextProvider';

import PlanetsTable from './components/PlanetsTable';
import Filters from './components/Filters';

function App() {
  return (
    <PlanetsContextProvider>
      <div className="app-container">
        <h1 className="app-head-title">Star Wars Planets</h1>
        <Filters />
        <PlanetsTable />
      </div>
    </PlanetsContextProvider>
  );
}

export default App;
