import React, { useState, Fragment, useReducer } from 'react';
import styled from 'styled-components';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import axios from 'axios';
import { useTheme } from 'styled-components';
import { XYPlot, XAxis, YAxis, LineSeries, makeWidthFlexible } from 'react-vis';
import { AiOutlinePlusSquare, AiOutlineMinusSquare } from 'react-icons/ai';
import { BASE_API_URL } from '../constants';
import reducer from '../reducers/chart-reducer';
import 'react-vis/dist/style.css';

const rangeToFormatString = {
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

const StockChart = ({ initialChart, symbol }) => {
  const [activeRangeButton, setActiveRangeButton] = useState('1d');
  const [isVisible, setIsVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [chart, dispatch] = useReducer(reducer, initialChart);

  function toggleVisibility() {
    setIsVisible((prevState) => !prevState);
  }

  function changeChartRange(range) {
    setActiveRangeButton(range);
    setIsLoading(true);

    if (chart[range]) {
      // chart data already exists for this range
      dispatch({
        type: 'CHANGE_CHART_RANGE',
        payload: { data: chart[range], type: range },
      });
      setIsLoading(false);
    } else {
      axios
        .get(BASE_API_URL + '/api/stocks/' + symbol + '/chart/' + range)
        .then((res) => {
          dispatch({
            type: 'CHANGE_CHART_RANGE',
            payload: { data: res.data, type: range },
          });
          setIsLoading(false);
        });
    }
  }

  function parseChartData() {
    const data = chart.data
      .filter((marker) => marker.high !== null)
      .map((marker) => {
        const dateString =
          chart.type === '1d' ? `${marker.date} ${marker.minute}` : marker.date;

        const formatString =
          chart.type === '1d' ? 'yyyy-MM-dd HH:mm' : 'yyyy-MM-dd';

        return {
          x: parse(dateString, formatString, new Date()),
          y: Number(marker.high),
        };
      });

    return data;
  }

  function handleTickFormat(tick) {
    return format(tick, rangeToFormatString[chart.type]);
  }

  const data = parseChartData();
  const FlexibleXYPlot = makeWidthFlexible(XYPlot);
  const strokeColor = useTheme().colors.secondary;

  return data.length ? (
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
            {Object.keys(rangeToFormatString).map((range) => (
              <button
                key={range}
                className={range === activeRangeButton ? 'active' : undefined}
                onClick={() => changeChartRange(range)}
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
