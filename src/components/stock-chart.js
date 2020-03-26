import React from 'react';
import styled from 'styled-components';
import format from 'date-fns/format';
import 'react-vis/dist/style.css';
import {
  XYPlot,
  XAxis,
  YAxis,
  // HorizontalGridLines,
  // VerticalGridLines,
  LineSeries,
} from 'react-vis';

function StockChart({ data }) {
  console.log('hello');
  console.log(data);
  const chartData = data
    .filter((interval) => interval.high !== null)
    .map((interval) => {
      return {
        x: new Date(`${interval.date} ${interval.minute}`),
        y: Number(interval.high),
        // y: interval.high !== null ? Number(interval.high) : null,
      };
    });

  return data.length ? (
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
        <XAxis tickTotal={6} tickFormat={(t) => format(t, 'h:mm')} />
        <YAxis />

        <LineSeries getNull={(d) => d.y !== null} data={chartData} />
      </XYPlot>
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
