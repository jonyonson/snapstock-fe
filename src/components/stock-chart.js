import React from 'react';
import styled from 'styled-components';
import format from 'date-fns/format';
import axios from 'axios';
import 'react-vis/dist/style.css';
import { XYPlot, XAxis, YAxis, LineSeries } from 'react-vis';

function StockChart({ chart, setChart, selection }) {
  console.log(chart);

  const displayChart = (range) => {
    const { symbol } = selection;
    const url = `http://localhost:5000/api/stocks/${symbol}/chart/${range}`;

    let r;
    if (range === '1d') {
      r = 'intraday';
    } else if (range === '5d') {
      r = 'fiveDay';
    } else if (range === '1m') {
      r = 'oneMonth';
    } else if (range === '3m') {
      r = 'threeMonth';
    } else if (range === '6m') {
      r = 'sixMonth';
    } else if (range === '1y') {
      r = 'oneYear';
    } else if (range === '2y') {
      r = 'twoYear';
    } else if (range === '5y') {
      r = 'fiveYear';
    } else {
      r = range;
    }

    if (range === '1d') {
      setChart((prev) => ({ ...prev, data: prev.intraday, type: 'intraday' }));
    } else if (chart[r]) {
      setChart((prev) => ({ ...prev, data: prev[r], type: range }));
    } else {
      axios.get(url).then((res) => {
        setChart((prev) => ({
          ...prev,
          [r]: res.data,
          data: res.data,
          type: r,
        }));
      });
    }
  };

  let chartData;
  if (chart.type === 'intraday') {
    chartData = chart.intraday
      .filter((interval) => interval.high !== null)
      .map((interval) => ({
        x: new Date(`${interval.date} ${interval.minute}`),
        y: Number(interval.high),
      }));
  } else {
    chartData = chart.data.map((interval) => ({
      x: new Date(interval.date),
      y: Number(interval.close),
    }));
  }

  const handleTickFormat = (tick) => {
    if (chart.type === 'intraday') {
      return format(tick, 'h:mm');
    } else if (chart.type === 'ytd') {
      return format(tick, 'M/d');
    } else if (chart.type === '5d' || chart.type === '1m') {
      return format(tick, 'MMM d');
    } else if (chart.type === '3m') {
      return format(tick, 'MMMM');
    } else if (chart.type === '6m' || chart.type === '1y') {
      return format(tick, 'MMM');
    } else if (chart.type === '2y') {
      return format(tick, 'MM-yy');
    } else if (chart.type === '5y' || chart.type === 'max') {
      return format(tick, 'yyyy');
    }
  };

  return chart.intraday.length ? (
    <ChartWrapper>
      <ChartRanges>
        <button onClick={() => displayChart('1d')}>1D</button>
        <button onClick={() => displayChart('5d')}>5D</button>
        <button onClick={() => displayChart('1m')}>1M</button>
        <button onClick={() => displayChart('3m')}>3M</button>
        <button onClick={() => displayChart('6m')}>6M</button>
        <button onClick={() => displayChart('ytd')}>YTD</button>
        <button onClick={() => displayChart('1y')}>1Y</button>
        <button onClick={() => displayChart('2y')}>2Y</button>
        <button onClick={() => displayChart('max')}>MAX</button>
      </ChartRanges>
      <XYPlot
        xType="time"
        width={415}
        height={240}
        margin={{ left: 50 }}
        animation
      >
        <XAxis tickTotal={6} tickFormat={handleTickFormat} />
        <YAxis />
        <LineSeries getNull={(d) => d.y !== null} data={chartData} />
      </XYPlot>
    </ChartWrapper>
  ) : null;
}

const ChartWrapper = styled.div`
  margin: 2rem 1rem;
  margin-bottom: 0;
  border: 1px solid #ccc;
`;

const ChartRanges = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  margin-bottom: 1rem;
  margin-right: 1rem;
  margin-left: 3rem;

  button {
    border: none;
    font-size: 0.75rem;
    outline: none;
  }
`;

export default StockChart;
