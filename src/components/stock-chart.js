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

function StockChart({ chart }) {
  console.log(chart);
  const chartData =
    chart.type === 'intraday'
      ? chart.data
          .filter((interval) => interval.high !== null)
          .map((interval) => ({
            x: new Date(`${interval.date} ${interval.minute}`),
            y: Number(interval.high),
          }))
      : chart.data.map((interval) => ({
          x: new Date(interval.date),
          y: Number(interval.close),
        }));

  const handleTickFormat = (tick) => {
    let tickFormat;
    if (chart.type === 'intraday') {
      tickFormat = format(tick, 'h:mm');
    }

    return tickFormat;
  };

  return chart.data.length ? (
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
