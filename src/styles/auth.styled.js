import styled from 'styled-components';

const AuthWrapper = styled.div`
  max-width: 400px;
  border-radius: 2px;
  padding: 1rem;
  /* border: 4px solid gray; */
  /* margin: 10% auto 0; */

  .signup-link,
  .signin-link {
    font-size: 1.1rem;
    text-decoration: none;
    color: ${(props) => props.theme.colors.secondary};

    &:hover {
      border-bottom: 2px solid currentColor;
    }
  }
`;

export default AuthWrapper;
