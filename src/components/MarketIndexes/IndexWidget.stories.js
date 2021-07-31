import React from 'react';
import Widget from './IndexWidget';
import './MarketIndexes.scss';

export default {
  title: 'Market Index Widget',
  component: Widget,
};

const Template = (args) => {
  return (
    <div style={{ maxWidth: '600px' }}>
      <Widget {...args} />
    </div>
  );
};

const MultipleTemplate = (args) => {
  return (
    <div style={{ maxWidth: '600px' }}>
      <div className="market-indexes">
        <Widget name="DOW" index={index} />
        <Widget name="S&P 500" index={index} />
        <Widget name="NASDAQ" index={index} />
      </div>
    </div>
  );
};

const index = {
  avgVolume: 320389206,
  change: 238.15078124999854,
  dayRange: '34,855.11 - 35,095.33',
  open: 34855.11,
  percentChange: 0.6838814740950009,
  previousClose: 34823.4,
  price: 35061.55078125,
  volume: 315059460,
  yearRange: '25,992.28 - 35,095.33',
};

export const Positive = Template.bind({});
Positive.args = {
  name: 'DOW',
  index,
};

export const Negative = Template.bind({});
Negative.args = {
  name: 'DOW',
  index: {
    ...index,
    change: -238.15078124999854,
    percentChange: -0.6838814740950009,
  },
};

export const Multiple = MultipleTemplate.bind({});
Multiple.args = {
  index: index,
};
