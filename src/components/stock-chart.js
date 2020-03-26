import React, { useState } from 'react';
import styled from 'styled-components';
import format from 'date-fns/format';
import axios from 'axios';
import 'react-vis/dist/style.css';
import {
  XYPlot,
  XAxis,
  YAxis,
  // HorizontalGridLines,
  // VerticalGridLines,
  LineSeries,
} from 'react-vis';

function StockChart({ chart, setChart, selection }) {
  const [data, setData] = useState();
  console.log(chart);

  // const getChart = () => {
  //   axios
  //     .get(url)
  //     .then((res) => {
  //       console.log(res.data);
  //       // setChart((prev) => ({ ...prev, type: 'historical' }));
  //       setChart({ data: res.data, type: 'historical' });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  // async function fetchChart(range) {
  //   const { symbol } = selection;
  //   const url = `http://localhost:5000/api/stocks/${symbol}/chart/${range}`;
  //   if (range === '5d') {
  //     if (!chart.fiveDay.length) {
  //       const data = await axios.get(url);
  //       console.log(data);
  //       // setChart((prev) => ({ ...prev, fiveDay: data, type: 'intraday' }));
  //     }
  //   }
  // }

  const fetchChart = (range) => {
    const { symbol } = selection;
    const url = `http://localhost:5000/api/stocks/${symbol}/chart/${range}`;

    if (range === '5d') {
      if (!chart.fiveDay.length) {
        // const data = await axios.get(url);
        // console.log(data);
        axios.get(url).then((res) => {
          setChart((prev) => ({
            ...prev,
            fiveDay: res.data,
            data: res.data,
            type: 'historical',
          }));
        });
      } else {
        setChart((prev) => ({
          ...prev,
          data: prev.fiveDay,
          type: 'historical',
        }));
      }
    } else if (range === '1d') {
      setChart((prev) => ({
        ...prev,
        data: prev.intraday,
        type: 'intraday',
      }));
    } else if (range === '1m') {
      if (!chart.oneMonth.length) {
        axios.get(url).then((res) => {
          setChart((prev) => ({
            ...prev,
            oneMonth: res.data,
            data: res.data,
            type: 'historical',
          }));
        });
      } else {
        setChart((prev) => ({
          ...prev,
          data: prev.oneMonth,
          type: 'historical',
        }));
      }
    } else if (range === '3m') {
      if (!chart.threeMonth.length) {
        axios.get(url).then((res) => {
          setChart((prev) => ({
            ...prev,
            threeMonth: res.data,
            data: res.data,
            type: 'historical',
          }));
        });
      } else {
        setChart((prev) => ({
          ...prev,
          data: prev.threeMonth,
          type: 'historical',
        }));
      }
    } else if (range === '6m') {
      if (!chart.sixMonth.length) {
        axios.get(url).then((res) => {
          setChart((prev) => ({
            ...prev,
            sixMonth: res.data,
            data: res.data,
            type: 'historical',
          }));
        });
      } else {
        setChart((prev) => ({
          ...prev,
          data: prev.sixMonth,
          type: 'historical',
        }));
      }
    } else if (range === '1y') {
      if (!chart.oneYear.length) {
        axios.get(url).then((res) => {
          setChart((prev) => ({
            ...prev,
            oneYear: res.data,
            data: res.data,
            type: 'historical',
          }));
        });
      } else {
        setChart((prev) => ({
          ...prev,
          data: prev.oneYear,
          type: 'historical',
        }));
      }
    } else if (range === 'ytd') {
      if (!chart.ytd.length) {
        axios.get(url).then((res) => {
          setChart((prev) => ({
            ...prev,
            ytd: res.data,
            data: res.data,
            type: 'historical',
          }));
        });
      } else {
        setChart((prev) => ({
          ...prev,
          data: prev.ytd,
          type: 'historical',
        }));
      }
    } else if (range === '2y') {
      if (!chart.twoYear.length) {
        axios.get(url).then((res) => {
          setChart((prev) => ({
            ...prev,
            twoYear: res.data,
            data: res.data,
            type: 'historical',
          }));
        });
      } else {
        setChart((prev) => ({
          ...prev,
          data: prev.twoYear,
          type: 'historical',
        }));
      }
    } else if (range === '5y') {
      if (!chart.fiveYear.length) {
        axios.get(url).then((res) => {
          setChart((prev) => ({
            ...prev,
            fiveYear: res.data,
            data: res.data,
            type: 'historical',
          }));
        });
      } else {
        setChart((prev) => ({
          ...prev,
          data: prev.fiveYear,
          type: 'historical',
        }));
      }
    } else if (range === 'max') {
      if (!chart.max.length) {
        axios.get(url).then((res) => {
          setChart((prev) => ({
            ...prev,
            max: res.data,
            data: res.data,
            type: 'historical',
          }));
        });
      } else {
        setChart((prev) => ({
          ...prev,
          data: prev.max,
          type: 'historical',
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
    let tickFormat;
    if (chart.type === 'intraday') {
      tickFormat = format(tick, 'h:mm');
    }

    return tickFormat;
  };

  return chart.intraday.length ? (
    <ChartWrapper>
      <XYPlot
        xType="time"
        width={415}
        height={240}
        animation
        margin={{ left: 50 }}
      >
        {/* <HorizontalGridLines /> */}
        {/* <VerticalGridLines /> */}
        <XAxis tickTotal={6} tickFormat={handleTickFormat} />
        <YAxis />

        <LineSeries getNull={(d) => d.y !== null} data={chartData} />
      </XYPlot>
      <button onClick={() => fetchChart('1d')}>1 Day</button>
      <button onClick={() => fetchChart('5d')}>5 Day</button>
      <button onClick={() => fetchChart('1m')}>1 Month</button>
      <button onClick={() => fetchChart('3m')}>3 Month</button>
      <button onClick={() => fetchChart('6m')}>6 Month</button>
      <button onClick={() => fetchChart('ytd')}>YTD</button>
      <button onClick={() => fetchChart('1y')}>1 Year</button>
      <button onClick={() => fetchChart('2y')}>2 Year</button>
      <button onClick={() => fetchChart('5y')}>5 Year</button>
      {/* <button onClick={() => fetchChart('max')}>MAX</button> */}
    </ChartWrapper>
  ) : null;
}

const ChartWrapper = styled.div`
  margin: 2rem 1rem;
  margin-bottom: 0;
  padding-top: 1rem;
  border: 1px solid #ccc;
`;

export default StockChart;
