import React, { useState, useEffect } from 'react';
import Autosuggest from 'react-autosuggest';
import axios from 'axios';
import '../styles/autosuggest.css';

const renderSuggestion = (suggestion) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div>{suggestion['2. name']}</div>
      <div>{suggestion['1. symbol']}</div>
    </div>
  );
};

function SearchBar({ setSelection }) {
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    if (matches.length > 0) {
      const matchesToDisplay = matches.filter(
        (match) => !match['1. symbol'].includes('.'),
      );

      setSuggestions(matchesToDisplay);
    }
  }, [matches]);

  // determine the input value for each suggestion
  const getSuggestionValue = (suggestion) => {
    const symbol = suggestion['1. symbol'];
    const name = suggestion['2. name'];

    return `${symbol}, ${name}`;
  };

  const onSuggestionSelected = (_, { suggestion }) => {
    const {
      '1. symbol': symbol,
      '2. name': name,
      '3. type': type,
      '4. region': region,
      '8. currency': currency,
    } = suggestion;

    setSelection({ symbol, name, type, region, currency });
    setValue('');
  };

  const onChange = (_, { newValue }) => setValue(newValue);

  const onSuggestionsFetchRequested = ({ value }) => fetchBestMatches(value);

  const onSuggestionsClearRequested = () => setSuggestions([]);

  const fetchBestMatches = (input) => {
    const API_KEY = process.env.REACT_APP_ALPHA_VANTAGE_API_KEY;
    const url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${input}&apikey=${API_KEY}`;

    axios
      .get(url)
      .then((res) => {
        setMatches(res.data.bestMatches || []);
      })
      .catch((err) => console.error(err));
  };

  // Pass through arbitrary props to the input
  // Must contain at least `value` and `onChange`
  const inputProps = {
    // placeholder: 'Search by symbol or company name',
    type: 'search',
    onChange,
    value,
  };

  return (
    <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      onSuggestionSelected={onSuggestionSelected}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      inputProps={inputProps}
    />
  );
}
export default SearchBar;
