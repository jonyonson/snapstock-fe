import React from 'react';
import styled from 'styled-components';
import format from 'date-fns/format';
import axios from 'axios';
import { XYPlot, XAxis, YAxis, LineSeries } from 'react-vis';
import 'react-vis/dist/style.css';

function StockChart({ chart, setChart, selection }) {
  console.log(chart);

  const displayChart = (range) => {
    const { symbol } = selection;
    const url = `http://localhost:5000/api/stocks/${symbol}/chart/${range}`;

    if (chart[range]) {
      setChart((prev) => ({ ...prev, data: prev[range], type: range }));
    } else {
      axios.get(url).then((res) => {
        const data = res.data;
        setChart((prev) => ({ ...prev, [range]: data, type: range, data }));
      });
    }
  };

  const data =
    chart.type === '1d'
      ? chart['1d']
          .filter((marker) => marker.high !== null)
          .map((marker) => ({
            x: new Date(`${marker.date} ${marker.minute}`),
            y: Number(marker.high),
          }))
      : chart.data.map((marker) => ({
          x: new Date(marker.date),
          y: Number(marker.close),
        }));

  const ranges = {
    '1d': 'h:mm',
    '5d': 'MMM d',
    '1m': 'MMM d',
    '3m': 'MMMM',
    '6m': 'MMM',
    '1y': 'MMM',
    ytd: 'M/d',
    '2y': 'MM-yy',
    max: 'yyyy',
  };

  const handleTickFormat = (tick) => format(tick, ranges[chart.type]);

  return chart.data.length ? (
    <ChartWrapper>
      <ChartRanges>
        {Object.keys(ranges).map((range) => (
          <button key={range} onClick={() => displayChart(range)}>
            {range.toUpperCase()}
          </button>
        ))}
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
        <LineSeries getNull={(d) => d.y !== null} data={data} />
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
