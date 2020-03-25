import React, { useState, Fragment, useEffect } from 'react';
import SearchBar from './search-bar';
import Quote from './quote';

function App() {
  const [selection, setSelection] = useState(null);

  useEffect(() => {}, [selection]);

  const handleSearchSelection = (selection) => {
    console.log(selection);
    setSelection(selection);
  };

  return (
    <Fragment>
      <SearchBar onSelect={handleSearchSelection} />
      <Quote selection={selection} />
    </Fragment>
  );
}

export default App;
