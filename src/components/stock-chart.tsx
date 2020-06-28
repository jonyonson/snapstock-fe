/// <reference path="../@types/styled.d.ts"/>
/// <reference path="../@types/react-vis.d.ts"/>

import React, { useState, useEffect, Fragment } from 'react';
import styled from 'styled-components';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import axios from 'axios';
import { useTheme } from 'styled-components';
import { XYPlot, XAxis, YAxis, LineSeries, makeWidthFlexible } from 'react-vis';
import { AiOutlinePlusSquare, AiOutlineMinusSquare } from 'react-icons/ai';
import 'react-vis/dist/style.css';
import { BASE_API_URL } from '../constants';

type ChartRange = '1d' | '5d' | '1m' | '3m' | '6m' | 'ytd' | '1y' | '2y' | '5y';

// type IntradayChartData = {
//   close: string;
//   date: string;
//   high: string;
//   low: string;
//   open: string;
//   volume: string;
// };

type ChartData = {
  close: number | string;
  date: number | string;
  high: number | string;
  low: number | string;
  open: number | string;
  volume: number | string;
  change?: number;
  changeOverTime?: number;
  changePercent?: number;
  label?: string;
  uClose?: number;
  uHigh?: number;
  uLow?: number;
  uOpen?: number;
  uVolume?: number;
};

// TODO Types
interface Chart {
  data: any[];
  // data: ChartData[];
  '1d'?: [] | any[];
  '5d'?: [] | any[];
  '1m'?: [] | any[];
  '3m'?: [] | any[];
  '6m'?: [] | any[];
  '1y'?: [] | any[];
  '2y'?: [] | any[];
  '5y'?: [] | any[];
  ytd?: [] | any[];
  type?: string;
}

interface Props {
  chart: Chart;
  setChart: any; // TODO
  symbol: string | null;
  chartLoading?: boolean;
  setChartLoading?: any; // TODO
}

const StockChart: React.FC<Props> = ({ chart, setChart, symbol }) => {
  const [activeRangeButton, setActiveRangeButton] = useState('1d');
  const [isVisible, setIsVisible] = useState(true);
  const [chartLoading, setChartLoading] = useState(false);

  useEffect(() => {
    setActiveRangeButton('1d');
  }, [symbol]);

  const toggleVisibility = () => {
    setIsVisible((prevState) => !prevState);
  };

  const displayChart = (range: ChartRange) => {
    // sets the button to active before the potential api call
    setActiveRangeButton(range);
    const url = `${BASE_API_URL}/api/stocks/${symbol}/chart/${range}`;
    setChartLoading(true);

    if (chart[range]) {
      setChart((prev: any) => ({ ...prev, data: prev[range], type: range })); // TODO any
      setChartLoading(false);
    } else {
      axios.get(url).then((res) => {
        const data = res.data;
        setChart((prev: any) => ({
          // TODO any
          ...prev,
          [range]: data,
          type: range,
          data,
        }));
        setChartLoading(false);
      });
    }
  };

  let data: any[];

  if (chart.type === '1d') {
    if (chart['1d'] === undefined) {
      data = [];
    } else {
      data = chart['1d']
        .filter((marker: any) => marker.high !== null)
        .map((marker: any) => {
          return {
            x: parse(marker.date, 'yyyy-MM-dd HH:mm:ss', new Date()),
            y: Number(marker.high),
          };
        });
    }
  } else {
    data = chart.data.map((marker: any) => {
      return {
        x: parse(marker.date, 'yyyy-MM-dd', new Date()),
        y: Number(marker.close),
      };
    });
  }

  const ranges: { [key: string]: string } = {
    '1d': 'h:mm',
    '5d': 'MMM d',
    '1m': 'MMM d',
    '3m': 'MMMM',
    '6m': 'MMM',
    ytd: 'M/d',
    '1y': 'MMM',
    '2y': 'MM-yy',
    '5y': 'yyyy',
  };

  const handleTickFormat = (tick: Date) => {
    return format(tick, ranges[chart.type as ChartRange]);
  };

  const FlexibleXYPlot = makeWidthFlexible(XYPlot);
  const strokeColor = useTheme().colors.secondary;

  return chart.data.length ? (
    <Section>
      <div className="section-title">
        <span>Charts</span>
        {isVisible ? (
          <AiOutlineMinusSquare
            className="toggle-btn"
            onClick={toggleVisibility}
            size={20}
          />
        ) : (
          <AiOutlinePlusSquare
            className="toggle-btn"
            onClick={toggleVisibility}
            size={20}
          />
        )}
      </div>
      {isVisible && (
        <Fragment>
          <ChartRanges>
            {Object.keys(ranges).map((range) => (
              <button
                key={range}
                className={range === activeRangeButton ? 'active' : undefined}
                onClick={() => displayChart(range as ChartRange)}
              >
                {range.toUpperCase()}
              </button>
            ))}
          </ChartRanges>

          <div className="chart-wrapper">
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
        </Fragment>
      )}
    </Section>
  ) : null;
};

const Section = styled.section`
  margin-bottom: 2rem;

  .chart-wrapper {
    border: 1px solid #ccc;
    padding-top: 1.5rem;
  }
`;

const ChartRanges = styled.div`
  display: flex;

  button {
    flex-grow: 1;
    border-radius: none;
    border: none;
    border-bottom: 3px solid transparent;
    padding: 0.5rem;
    background: transparent;
    outline: none;

    @media (min-width: 321px) {
      font-size: 0.75rem;
    }

    @media (min-width: 770px) {
      font-size: 0.875rem;
    }

    &.active {
      font-weight: bold;
      border-bottom: 3px solid ${(props) => props.theme.colors.accent};
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

// interface ChartData {
//   close: number | string;
//   date: Date | string;
//   high: number | string;
//   low: number | string;
//   open: string | number;
//   volume: string | number;

//   change?: number;
//   changeOverTime?: number;
//   changePercent?: number;
//   label?: string;
//   uClose?: number;
//   uHigh?: number;
//   uLow?: number;
//   uOpen?: number;
//   uVolume?: number;
// };
