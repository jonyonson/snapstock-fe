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

  a {
    color: ${(props) => props.theme.colors.secondary};
    text-decoration: none;
  }

  .section-title {
    margin: 0;
    text-transform: uppercase;
    font-size: 0.9375rem;
    font-weight: bold;
    color: rgba(0, 0, 0, 0.6);
    border-bottom: 2px solid ${(props) => props.theme.colors.primary};
    padding-bottom: 0.1rem;
    margin-bottom: 0.875rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .toggle-btn {
      cursor: pointer;
    }
  }

  .autosuggest {
    @media (min-width: 770px) {
      margin-bottom: 3rem
    }
  }

`;

export default GlobalStyle;
