import React from 'react';
import PropTypes from 'prop-types';

import formatDate from '../helpers/formatDate';

function PlanetRow({ planet, fields }) {
  return (
    <tr data-testid={ `planet-row-${planet.name}` }>
      {
        fields.map((field) => {
          let content = planet[field];
          if (field === 'created' || field === 'edited') {
            content = formatDate(content);
          }
          if (field === 'films') {
            content = content.join(', ');
          }
          return (
            <td
              key={ `${field}-${planet.name}` }
              data-testid={ `${field}-${planet.name}` }
            >
              {content}
            </td>
          );
        })
      }
    </tr>
  );
}

export default PlanetRow;

PlanetRow.propTypes = {
  planet: PropTypes.object,
  fields: PropTypes.arrayOf(PropTypes.string),
}.isRequired;
