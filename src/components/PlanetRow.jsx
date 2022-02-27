import React from 'react';
import PropTypes from 'prop-types';

function PlanetRow({ planet, fields }) {
  return (
    <tr data-testid={ `planet-row-${planet.name}` }>
      {
        fields.map((field) => (
          <td
            key={ `${field}-${planet.name}` }
            data-testid={ `${field}-${planet.name}` }
          >
            {planet[field]}
          </td>
        ))
      }
    </tr>
  );
}

export default PlanetRow;

PlanetRow.propTypes = {
  planet: PropTypes.object,
  fields: PropTypes.arrayOf(PropTypes.string),
}.isRequired;
