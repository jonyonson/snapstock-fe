import styled from 'styled-components';

const AuthWrapper = styled.div`
  max-width: 400px;
  border-radius: 2px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 8% auto 0;

  h1 {
    margin: 0 0 1rem;
  }

  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 1rem;
  }

  input,
  button {
    -webkit-appearance: none;
    border-radius: 0;
  }

  input {
    padding: 0.75rem;
    font-size: 20px;
    margin-bottom: 1rem;
    border: 1px solid black;
  }

  label {
    margin-bottom: 1rem;
  }

  button {
    font-size: 18px;
    font-weight: bold;
    color: white;
    padding: 1rem;
    text-transform: uppercase;
    margin-top: 1rem;
    margin-bottom: 1.5rem;
    border: 1px solid transparent;
    background-color: ${(props) => props.theme.colors.accent};
  }

  .link-text {
    display: flex;

    a {
      margin-left: 5px;
      font-weight: bold;
      text-decoration: none;
      color: ${(props) => props.theme.colors.secondary};

      &:hover {
        border-bottom: 2px solid currentColor;
      }
    }
  }
`;

export default AuthWrapper;
