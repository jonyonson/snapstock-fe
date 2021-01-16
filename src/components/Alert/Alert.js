import React from 'react';
import PropTypes from 'prop-types';

import './Alert.scss';

function Alert({ severity, children }) {
  return (
    <div className={`Alert-root Alert-${severity}`} data-testid="alert">
      {children}
    </div>
  );
}

Alert.propTypes = {
  severity: PropTypes.oneOf(['error', 'info', 'success', 'warning']).isRequired,
  children: PropTypes.node.isRequired,
};

export default Alert;
