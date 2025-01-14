import React from 'react';
import styled from "styled-components";

interface Props {
  children: React.ReactNode;
}

const StyledDiv = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
`;

const Center: React.FC<Props> = ({ children }) => {
    return (
      <StyledDiv>{children}</StyledDiv>
    );
}
export default Center;