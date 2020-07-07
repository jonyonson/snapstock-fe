import React, { useState, Fragment } from 'react';
import styled from 'styled-components';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import axios from 'axios';
import { useTheme } from 'styled-components';
import { XYPlot, XAxis, YAxis, LineSeries, makeWidthFlexible } from 'react-vis';
import { AiOutlinePlusSquare, AiOutlineMinusSquare } from 'react-icons/ai';
import { BASE_API_URL } from '../constants';
import 'react-vis/dist/style.css';

type FixMeLater = any;
type ChartRange = '1d' | '5d' | '1m' | '3m' | '6m' | 'ytd' | '1y' | '2y' | '5y';
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

interface Chart {
  '1d'?: [] | FixMeLater[];
  '5d'?: [] | FixMeLater[];
  '1m'?: [] | FixMeLater[];
  '3m'?: [] | FixMeLater[];
  '6m'?: [] | FixMeLater[];
  '1y'?: [] | FixMeLater[];
  '2y'?: [] | FixMeLater[];
  '5y'?: [] | FixMeLater[];
  ytd?: [] | FixMeLater[];
  type?: string;
  data: FixMeLater[];
  // data: ChartData[];
}

type Props = {
  symbol: string | null;
  chart: FixMeLater;
  setChart: (value: FixMeLater) => FixMeLater;
  // chart: Chart;
  // setChart: (value: React.SetStateAction<Chart>) => void;
};

const StockChart = ({ chart, symbol, setChart }: Props) => {
  const [activeRangeButton, setActiveRangeButton] = useState('1d');
  const [isVisible, setIsVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const toggleVisibility = () => setIsVisible((prevState) => !prevState);

  const displayChart = (range: ChartRange) => {
    setActiveRangeButton(range);
    setIsLoading(true);

    if (chart[range]) {
      setChart((prev: Chart) => ({ ...prev, data: prev[range], type: range }));
      setIsLoading(false);
    } else {
      axios
        .get(BASE_API_URL + '/api/stocks/' + symbol + '/chart/' + range)
        .then((res) => {
          const data = res.data;
          setChart((p: Chart) => ({ ...p, [range]: data, type: range, data }));
          setIsLoading(false);
        });
    }
  };

  let currentChart = chart[chart.type] ?? [];

  const data = currentChart
    .filter((marker: FixMeLater) => marker.high !== null)
    .map((marker: FixMeLater) => {
      const dateString =
        chart.type === '1d' ? `${marker.date} ${marker.minute}` : marker.date;

      const formatString =
        chart.type === '1d' ? 'yyyy-MM-dd HH:mm' : 'yyyy-MM-dd';

      return {
        x: parse(dateString, formatString, new Date()),
        y: Number(marker.high),
      };
    });

  const ranges: { [key in ChartRange]: string } = {
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
              {isLoading && <LoadingMask />}
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

// date: string or Date?
// minute: string
// label: string
// high: number
// low: number
// open: nuber;
// volum: number;
