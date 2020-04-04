import React, { useState, useEffect, Fragment } from 'react';
import styled from 'styled-components';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import axios from 'axios';
import { useTheme } from 'styled-components';
import { XYPlot, XAxis, YAxis, LineSeries, makeWidthFlexible } from 'react-vis';
import 'react-vis/dist/style.css';

import { BASE_API_URL } from '../constants';

function StockChart({
  chart,
  setChart,
  symbol,
  chartLoading,
  setChartLoading,
}) {
  const [activeRangeButton, setActiveRangeButton] = useState('1d');

  useEffect(() => {
    setActiveRangeButton('1d');
  }, [symbol]);

  const displayChart = (range) => {
    // sets the button to active before the potential api call
    setActiveRangeButton(range);
    const url = `${BASE_API_URL}/api/stocks/${symbol}/chart/${range}`;
    setChartLoading(true);
    if (chart[range]) {
      setChart((prev) => ({ ...prev, data: prev[range], type: range }));
      setChartLoading(false);
    } else {
      axios.get(url).then((res) => {
        const data = res.data;
        setChart((prev) => ({ ...prev, [range]: data, type: range, data }));
        setChartLoading(false);
      });
    }
  };

  const data =
    chart.type === '1d'
      ? chart['1d']
          .filter((marker) => marker.high !== null)
          .map((marker) => {
            return {
              x: parse(marker.date, 'yyyy-MM-dd HH:mm:ss', new Date()),
              y: Number(marker.high),
            };
          })
      : chart.data.map((marker) => {
          return {
            x: parse(marker.date, 'yyyy-MM-dd', new Date()),
            y: Number(marker.close),
          };
        });

  const ranges = {
    '1d': 'h:mm',
    '5d': 'MMM d',
    '1m': 'MMM d',
    '3m': 'MMMM',
    '6m': 'MMM',
    ytd: 'M/d',
    '1y': 'MMM',
    '2y': 'MM-yy',
    max: 'yyyy',
  };

  const handleTickFormat = (tick) => {
    return format(tick, ranges[chart.type]);
  };

  const FlexibleXYPlot = makeWidthFlexible(XYPlot);
  const strokeColor = useTheme().colors.secondary;

  return chart.data.length ? (
    <Section>
      <div className="section-title">Charts</div>
      <div className="chart-wrapper">
        <ChartRanges>
          {Object.keys(ranges).map((range) => (
            <button
              key={range}
              className={range === activeRangeButton ? 'active' : undefined}
              onClick={() => displayChart(range)}
            >
              {range.toUpperCase()}
            </button>
          ))}
        </ChartRanges>
        <FlexibleXYPlot
          xType="time"
          height={240}
          margin={{ left: 50 }}
          stroke={strokeColor}
        >
          {chartLoading && <LoadingMask />}
          <XAxis tickTotal={6} tickFormat={handleTickFormat} />
          <YAxis />
          <LineSeries getNull={(d) => d.y !== null} data={data} />
        </FlexibleXYPlot>
      </div>
    </Section>
  ) : null;
}

const Section = styled.section`
  .chart-wrapper {
    border: 1px solid #ccc;
  }
`;
// const ChartWrapper = styled.div`
//   border: 1px solid #ccc;
// `;

const ChartRanges = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.75rem;

  @media (min-width: 500px) {
    padding: 1rem 0.75rem;
    justify-content: flex-end;
  }

  button {
    border: 1px solid #1d1d1d;
    outline: none;
    padding: 0.2rem;
    border-radius: 3px;
    background: transparent;
    font-size: 0.65rem;

    @media (min-width: 321px) {
      font-size: 0.75rem;
      padding: 0.2rem 0.4rem;
    }

    @media (min-width: 500px) {
      margin-left: 0.7rem;
    }

    &.active {
      font-weight: bold;
      background: ${(props) => props.theme.colors.accent};
      color: #fff;
    }
  }
`;

const LoadingMask = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 240px;
  z-index: 99;
  background-color: rgba(255, 255, 255, 0.8);
`;

export default StockChart;
