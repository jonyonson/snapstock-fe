import styled from 'styled-components';

const AuthWrapper = styled.div`
  max-width: 400px;
  /* border: 4px solid gray; */
  border-radius: 2px;
  /* margin: 10% auto 0; */
  padding: 1rem;

  .signup-link,
  .signin-link {
    text-decoration: none;
    color: ${(props) => props.theme.colors.secondary};

    &:hover {
      border-bottom: 1px solid currentColor;
    }
  }
`;

export default AuthWrapper;
