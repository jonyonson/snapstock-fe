import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';
import './Button.scss';

function Button({
  variant,
  backgroundColor,
  size,
  label,
  href,
  loading,
  style,
  ...props
}) {
  const variantClass = ` Button--${variant}`;
  const sizeClass = ` Button--${size}`;
  const classNames = ['Button', sizeClass, variantClass].join('');
  const styles = backgroundColor ? { backgroundColor, ...style } : style;

  console.log(style);

  return href ? (
    <Link className={classNames} to={href} style={styles}>
      {label}
    </Link>
  ) : (
    <button type="button" className={classNames} style={styles} {...props}>
      {loading ? <BeatLoader size={12} color="#fff" /> : label}
    </button>
  );
}

Button.propTypes = {
  variant: PropTypes.oneOf(['primary', 'secondary', 'ghost', 'text']),
  backgroundColor: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  href: PropTypes.string,
  loading: PropTypes.bool,
  style: PropTypes.object,
};

Button.defaultProps = {
  backgroundColor: null,
  variant: 'primary',
  size: 'medium',
  onClick: undefined,
  href: null,
  loading: false,
  style: null,
};

export default Button;
