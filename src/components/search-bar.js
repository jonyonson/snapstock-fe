import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import Autosuggest from 'react-autosuggest';
import { IoMdClose } from 'react-icons/io';
import '../styles/autosuggest.css';

function SearchBar({ setSymbol, showSearch, setShowSearch }) {
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [matches, setMatches] = useState([]);
  const history = useHistory();

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
    const { '1. symbol': symbol } = suggestion;
    setSymbol(symbol);
    setValue('');
    setShowSearch(false);
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
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>{suggestion['2. name']}</div>
        <div>{suggestion['1. symbol']}</div>
      </div>
    );
  };

  const fetchBestMatches = (input) => {
    const API_KEY = process.env.REACT_APP_ALPHA_VANTAGE_API_KEY;
    const url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${input}&apikey=${API_KEY}`;

    axios
      .get(url)
      .then((res) => {
        console.log(res);
        setMatches(res.data.bestMatches || []);
      })
      .catch((err) => console.error(err));
  };

  const handleKeyUp = (e) => {
    if (e.keyCode === 27) {
      setValue('');
      setShowSearch(false);
    }
  };

  // Pass through arbitrary props to the input
  // Must contain at least `value` and `onChange`
  const inputProps = {
    placeholder: 'SEARCH BY SYMBOL OR NAME',
    type: 'search',
    onChange,
    value,
    autoFocus: true,
  };

  return showSearch ? (
    <SearchContainer onKeyUp={handleKeyUp}>
      <IoMdClose onClick={() => setShowSearch(false)} className="close" />
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        onSuggestionSelected={onSuggestionSelected}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
    </SearchContainer>
  ) : null;
}

const SearchContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background-color: ${(props) => props.theme.colors.primary};
  bottom: 0;
  right: 0;
  z-index: 100;
  padding: 5rem 2rem 1rem;

  .close {
    color: white;
    font-size: 32px;
    position: absolute;
    top: 1.5rem;
    right: 2rem;
    cursor: pointer;
  }
`;
export default SearchBar;
