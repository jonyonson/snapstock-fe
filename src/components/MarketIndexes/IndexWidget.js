import React from 'react';
import format from '../../utils/format-number';
import './IndexWidget.scss';

const Widget = ({ name, index }) => {
  const options = { change: true };
  const change = index ? format(index.change, options) : '--';
  const percentChange = index
    ? format(index.percentChange, { ...options, suffix: '%' })
    : '--';
  const price = index ? format(index.price) : '--';

  let classNames = 'index-widget';

  if (!index) {
    classNames += ' index-widget--loading';
  } else {
    if (index.percentChange >= 0) {
      classNames += ' index-widget--up';
    } else {
      classNames += ' index-widget--down';
    }
  }

  return (
    <div className={classNames} name={name} data-testid="index-widget">
      <div className="index-widget__top">
        <div>{name}</div>
        <div className="change">{change}</div>
      </div>
      <div className="index-widget__bottom">
        <div className="index-widget__percent-change">
          <span>{percentChange}</span>
        </div>
        <div className="index-widget__price">{price}</div>
      </div>
    </div>
  );
};

export default Widget;
