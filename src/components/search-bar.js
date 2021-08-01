import React, { useState, useEffect, Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import Autosuggest from 'react-autosuggest';
import { FaSearch } from 'react-icons/fa';
import '../styles/autosuggest.scss';

function SearchBar() {
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [matches, setMatches] = useState([]);
  const [showPlaceholder, setShowPlaceholder] = useState(true);
  const history = useHistory();

  useEffect(() => {
    if (matches.length > 0) {
      const matchesToDisplay = matches.filter(
        (match) => !match.symbol.includes('.'),
      );
      setSuggestions(matchesToDisplay);
    }
  }, [matches]);

  useEffect(() => {
    setShowPlaceholder(!value.length);
  }, [value]);

  // determine the input value for each suggestion
  const getSuggestionValue = (suggestion) => {
    const { symbol, securityName } = suggestion;
    return `${symbol}, ${securityName}`;
  };

  const onSuggestionSelected = (_, { suggestion }) => {
    const { symbol } = suggestion;
    setValue('');
    history.push(`/stocks/${symbol.toLowerCase()}`);
  };

  const onChange = (_, { newValue }) => {
    setValue(newValue);
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    fetchBestMatches(value);
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const renderSuggestion = (suggestion) => {
    return (
      <Fragment>
        <div>{suggestion.securityName}</div>
        <div>{suggestion.symbol}</div>
      </Fragment>
    );
  };

  const fetchBestMatches = (input) => {
    // const API_KEY = process.env.REACT_APP_ALPHA_VANTAGE_API_KEY;
    // const alphaVantageEndpoint = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${input}&apikey=${API_KEY}`;
    const API_KEY = process.env.REACT_APP_IEX_CLOUD_API_KEY;
    axios
      .get(`https://cloud.iexapis.com/stable/search/${input}?token=${API_KEY}`)
      .then((res) => setMatches(res.data || []))
      .catch((err) => {
        console.error(err);
        alert('Something went wrong. Try back later.\n' + err);
        setValue('');
      });
  };

  // Pass through arbitrary props to the input
  // Must contain at least `value` and `onChange`
  const inputProps = {
    type: 'search',
    onChange,
    value,
    id: 'search',
  };

  return (
    <Styled>
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        onSuggestionSelected={onSuggestionSelected}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
      {showPlaceholder && (
        <Placeholder>
          <FaSearch size={18} color={'rgba(0, 0, 0, 0.7)'} />
          <span>Search Quotes</span>
        </Placeholder>
      )}
    </Styled>
  );
}

const Styled = styled.div`
  position: relative;
  height: 50px;

  .react-autosuggest__container,
  .react-autosuggest__container input {
    height: 50px;
  }

  @media (min-width: 770px) {
    flex-grow: 1;
  }
`;

const Placeholder = styled.div`
  height: 100%;
  width: 200px;
  position: absolute;
  top: 0;
  z-index: -1;
  left: 50%;
  margin-left: -100px;
  display: flex;
  align-items: center;
  justify-content: center;

  span {
    font-size: 0.9375rem;
    letter-spacing: 1px;
    text-transform: uppercase;
    font-weight: 900;
    color: rgba(0, 0, 0, 0.7);
    margin-left: 1rem;
  }

  @media (min-width: 770px) {
    left: 0;
    margin-left: 0;
    padding-left: 1rem;
    justify-content: flex-start;
  }
`;

export default SearchBar;
