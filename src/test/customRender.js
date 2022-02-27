import { render } from '@testing-library/react';

import PlanetsContextProvider from '../context/PlanetsContextProvider';

function customRender(ui) {
  return render(
    <PlanetsContextProvider>{ui}</PlanetsContextProvider>,
  );
}

export default customRender;
