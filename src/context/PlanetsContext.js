import { createContext, useContext } from 'react';

const PlanetsContext = createContext();

// Hook customizado para uso do Contexto sem necessidade de importá-lo diretamente
function usePlanetsContext() {
  const context = useContext(PlanetsContext);

  return context;
}

export {
  PlanetsContext,
  usePlanetsContext,
};
