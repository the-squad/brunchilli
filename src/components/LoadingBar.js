import React from 'react';
import styled from 'styled-components';

import Colors from '../base/Colors';
import { indeterminate, indeterminateShort } from '../animations';

const ProgressContainer = styled.div`
  background-clip: padding-box;
  background-color: ${Colors.light};
  border-radius: 2px;
  display: block;
  height: 4px;
  margin: 0.5rem 0 1rem 0;
  overflow: hidden;
  position: relative;
  width: 100%;
`;

const Bar = styled.div`
  background-color: ${Colors.primary};

  &::before {
    animation: ${indeterminate} 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
    background-color: inherit;
    bottom: 0;
    content: '';
    left: 0;
    position: absolute;
    top: 0;
    will-change: left, right;
  }

  &::after {
    animation: ${indeterminateShort} 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) infinite;
    animation-delay: 1.15s;
    background-color: inherit;
    bottom: 0;
    content: '';
    left: 0;
    position: absolute;
    top: 0;
    will-change: left, right;
  }
`;

const InfiniteLoadingBar = () => (
  <ProgressContainer>
    <Bar />
  </ProgressContainer>
);

export default InfiniteLoadingBar;
