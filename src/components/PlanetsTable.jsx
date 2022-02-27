import React from 'react';
import { usePlanetsContext } from '../context/PlanetsContext';

import PlanetRow from './PlanetRow';
import Loading from './Loading';
import Error from './Error';

import formatFieldName from '../helpers/formatFieldName';

function PlanetsTable() {
  const { data, fields, loading, error } = usePlanetsContext();

  if (error) {
    return (<Error />);
  }

  if (loading) {
    return (<Loading />);
  }

  // Todas as keys foram nomeadas com essa dica incrível
  // https://stackoverflow.com/questions/39549424/how-to-create-unique-keys-for-react-elements
  return (
    <table>
      <thead>
        <tr>
          {
            fields.map((field) => (
              <th key={ `header-${field}` }>{formatFieldName(field)}</th>
            ))
          }
        </tr>
      </thead>
      <tbody>
        {
          data.map((planet) => (
            <PlanetRow key={ `row-${planet.name}` } planet={ planet } fields={ fields } />
          ))
        }
      </tbody>
    </table>
  );
}

export default PlanetsTable;
