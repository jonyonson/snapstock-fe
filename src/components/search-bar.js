import React, { useState, useEffect } from 'react';
import Autosuggest from 'react-autosuggest';
import axios from 'axios';
import '../styles/autosuggest.css';

const renderSuggestion = (suggestion) => {
  // console.log('suggestion', suggestion);
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div>{suggestion['2. name']}</div>
      <div>{suggestion['1. symbol']}</div>
    </div>
  );
};

function SearchBar() {
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

  const getSuggestionValue = (selection) => {
    const suggestion = {
      symbol: selection['1. symbol'],
      name: selection['2. name'],
    };
    console.log(suggestion);
    return `${suggestion.symbol}, ${suggestion.name}`;
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

  const inputProps = {
    placeholder: 'Search by symbol or name',
    type: 'search',
    value,
    onChange,
  };

  return (
    <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      inputProps={inputProps}
    />
  );
}
export default SearchBar;
