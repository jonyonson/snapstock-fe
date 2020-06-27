import React from 'react';
import { BarLoader as Loader } from 'react-spinners';
import styled, { useTheme } from 'styled-components';

// interface Props {
//   readonly type: string;
// }

// function BarLoader() {
const BarLoader: React.FC = () => {
  const loaderColor = useTheme().colors.primary;

  return (
    <LoadingWrapper>
      <Loader width={200} color={loaderColor} />
    </LoadingWrapper>
  );
};

const LoadingWrapper = styled.div`
  position: absolute;
  top: 25%;
  left: 50%;
  margin-left: -100px;
`;

export default BarLoader;
