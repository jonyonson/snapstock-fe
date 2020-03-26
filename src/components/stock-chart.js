import React from 'react';
import styled from 'styled-components';
import format from 'date-fns/format';
import axios from 'axios';
import 'react-vis/dist/style.css';
import { XYPlot, XAxis, YAxis, LineSeries } from 'react-vis';

function StockChart({ chart, setChart, selection }) {
  console.log(chart);

  const fetchChart = (range) => {
    console.log('range', range);
    const { symbol } = selection;
    const url = `http://localhost:5000/api/stocks/${symbol}/chart/${range}`;

    if (range === '1d') {
      setChart((prev) => ({ ...prev, data: prev.intraday, type: 'intraday' }));
    } else if (range === '5d') {
      if (!chart.fiveDay.length) {
        axios.get(url).then((res) => {
          setChart((prev) => ({
            ...prev,
            fiveDay: res.data,
            data: res.data,
            type: range,
          }));
        });
      } else {
        setChart((prev) => ({
          ...prev,
          data: prev.fiveDay,
          type: range,
        }));
      }
    } else if (range === '1m') {
      if (!chart.oneMonth.length) {
        axios.get(url).then((res) => {
          setChart((prev) => ({
            ...prev,
            oneMonth: res.data,
            data: res.data,
            type: range,
          }));
        });
      } else {
        setChart((prev) => ({
          ...prev,
          data: prev.oneMonth,
          type: range,
        }));
      }
    } else if (range === '3m') {
      if (!chart.threeMonth.length) {
        axios.get(url).then((res) => {
          setChart((prev) => ({
            ...prev,
            threeMonth: res.data,
            data: res.data,
            type: range,
          }));
        });
      } else {
        setChart((prev) => ({
          ...prev,
          data: prev.threeMonth,
          type: range,
        }));
      }
    } else if (range === '6m') {
      if (!chart.sixMonth.length) {
        axios.get(url).then((res) => {
          setChart((prev) => ({
            ...prev,
            sixMonth: res.data,
            data: res.data,
            type: range,
          }));
        });
      } else {
        setChart((prev) => ({
          ...prev,
          data: prev.sixMonth,
          type: range,
        }));
      }
    } else if (range === '1y') {
      if (!chart.oneYear.length) {
        axios.get(url).then((res) => {
          setChart((prev) => ({
            ...prev,
            oneYear: res.data,
            data: res.data,
            type: range,
          }));
        });
      } else {
        setChart((prev) => ({
          ...prev,
          data: prev.oneYear,
          type: range,
        }));
      }
    } else if (range === 'ytd') {
      if (!chart.ytd.length) {
        axios.get(url).then((res) => {
          setChart((prev) => ({
            ...prev,
            ytd: res.data,
            data: res.data,
            type: range,
          }));
        });
      } else {
        setChart((prev) => ({
          ...prev,
          data: prev.ytd,
          type: range,
        }));
      }
    } else if (range === '2y') {
      if (!chart.twoYear.length) {
        axios.get(url).then((res) => {
          setChart((prev) => ({
            ...prev,
            twoYear: res.data,
            data: res.data,
            type: range,
          }));
        });
      } else {
        setChart((prev) => ({
          ...prev,
          data: prev.twoYear,
          type: range,
        }));
      }
    } else if (range === '5y') {
      if (!chart.fiveYear.length) {
        axios.get(url).then((res) => {
          setChart((prev) => ({
            ...prev,
            fiveYear: res.data,
            data: res.data,
            type: range,
          }));
        });
      } else {
        setChart((prev) => ({
          ...prev,
          data: prev.fiveYear,
          type: range,
        }));
      }
    } else if (range === 'max') {
      if (!chart.max.length) {
        axios.get(url).then((res) => {
          setChart((prev) => ({
            ...prev,
            max: res.data,
            data: res.data,
            type: range,
          }));
        });
      } else {
        setChart((prev) => ({
          ...prev,
          data: prev.max,
          type: range,
        }));
      }
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
        <button onClick={() => fetchChart('1d')}>1D</button>
        <button onClick={() => fetchChart('5d')}>5D</button>
        <button onClick={() => fetchChart('1m')}>1M</button>
        <button onClick={() => fetchChart('3m')}>3M</button>
        <button onClick={() => fetchChart('6m')}>6M</button>
        <button onClick={() => fetchChart('ytd')}>YTD</button>
        <button onClick={() => fetchChart('1y')}>1Y</button>
        <button onClick={() => fetchChart('2y')}>2Y</button>
        <button onClick={() => fetchChart('max')}>MAX</button>
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
