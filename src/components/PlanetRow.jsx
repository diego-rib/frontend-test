import React from 'react';
import PropTypes from 'prop-types';

import formatDate from '../helpers/formatDate';

function PlanetRow({ planet, fields }) {
  return (
    <tr data-testid={ `planet-row-${planet.name}` }>
      {
        fields.map((field) => {
          let content = planet[field];
          let classname = '';

          if (field === 'created' || field === 'edited') {
            content = formatDate(content);
            classname = 'one-line-field';
          } else if (field === 'url') {
            classname = 'one-line-field';
          } else if (field === 'films') {
            content = content.join(', ');
          }

          return (
            <td
              key={ `${field}-${planet.name}` }
              data-testid={ `${field}-${planet.name}` }
              className={ classname }
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
