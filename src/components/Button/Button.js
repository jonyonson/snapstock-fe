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
  onClick,
  style,
  disabled,
  ...props
}) {
  const variantClass = ` Button--${variant}`;
  const sizeClass = ` Button--${size}`;
  let classNames = ['Button', sizeClass, variantClass].join('');
  const styles = backgroundColor ? { backgroundColor, ...style } : style;

  let loaderSize = 8;
  if (size === 'small') loaderSize = 6;
  if (size === 'large') loaderSize = 10;

  return href ? (
    <Link className={classNames} to={href} style={styles} {...props}>
      {label}
    </Link>
  ) : (
    <button
      onClick={onClick}
      className={classNames}
      style={styles}
      disabled={disabled || loading}
      {...props}
    >
      {variant === 'primary' ? (
        <>
          {!loading && label}
          <BeatLoader loading={loading} size={loaderSize} color="#FFF" />
        </>
      ) : (
        label
      )}
    </button>
  );
}

Button.propTypes = {
  backgroundColor: PropTypes.string,
  disabled: PropTypes.bool,
  href: PropTypes.string,
  label: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  style: PropTypes.object,
  variant: PropTypes.oneOf(['primary', 'secondary', 'ghost', 'text']),
};

Button.defaultProps = {
  backgroundColor: null,
  disabled: false,
  href: null,
  loading: false,
  onClick: undefined,
  size: 'medium',
  style: null,
  variant: 'primary',
};

export default Button;
