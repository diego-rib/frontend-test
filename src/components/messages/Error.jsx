import React from 'react';

import '../../styles/Error.css';

function Error() {
  return (
    <div className="error-message">
      <h1>Houve um erro ao se conectar com o servidor.</h1>
      <h1>Tente novamente em alguns instantes.</h1>
    </div>
  );
}

export default Error;
