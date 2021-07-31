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

  let classNames = 'IndexWidget';

  if (!index) {
    classNames += ' IndexWidget--loading';
  } else {
    if (index.percentChange >= 0) {
      classNames += ' IndexWidget--positive';
    } else {
      classNames += ' IndexWidget--negative';
    }
  }

  return (
    <div className={classNames} name={name} data-testid="index-widget">
      <div className="IndexWidget__top">
        <div>{name}</div>
        <div className="change">{change}</div>
      </div>
      <div className="IndexWidget__bottom">
        <div className="IndexWidget__percent-change">
          <span>{percentChange}</span>
        </div>
        <div className="IndexWidget__price">{price}</div>
      </div>
    </div>
  );
};

export default Widget;
