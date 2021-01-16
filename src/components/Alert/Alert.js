import React from 'react';
import PropTypes from 'prop-types';

import './Alert.scss';

function Alert({ severity, children }) {
  return <div className={`Alert-root Alert-${severity}`}>{children}</div>;
}

Alert.propTypes = {
  severity: PropTypes.oneOf(['error', 'info', 'success', 'warning']).isRequired,
  children: PropTypes.element.isRequired,
};

export default Alert;
