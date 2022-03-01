import React from 'react';
import { usePlanetsContext } from '../context/PlanetsContext';

import PlanetRow from './PlanetRow';
import Loading from './messages/Loading';
import Error from './messages/Error';

import formatFieldName from '../helpers/formatFieldName';
import orderByField from '../helpers/sortField';

function PlanetsTable() {
  const {
    data,
    fields,
    loading,
    error,
    filters: { order },
  } = usePlanetsContext();

  if (error) {
    return (<Error />);
  }

  if (loading) {
    return (<Loading />);
  }

  const orderedPlanets = orderByField(data, order);

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
          orderedPlanets.map((planet) => (
            <PlanetRow key={ `row-${planet.name}` } planet={ planet } fields={ fields } />
          ))
        }
      </tbody>
    </table>
  );
}

export default PlanetsTable;
