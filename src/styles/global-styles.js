import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
  }

  html, body {
    height: 100%;
    width: 100%;
    line-height: 1.4;
  }

  body {
    color: #333;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  #root, .app {
    height: 100%;
  }

  h1,h2,h3,h4,h5,h6 {
    color: #444;
    line-height:1.1;
  }

  h1 + *,
  h2 + *,
  h3 + *,
  h4 + *,
  h5 + *,
  h6 + * {
    margin-top: 0.5rem;
  }


  button {
    cursor: pointer
  }
`;

export default GlobalStyle;
