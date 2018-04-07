import React from 'react';
import styled from 'styled-components';

import LoadingBar from './LoadingBar';

import logo from '../logo.svg';
import Space from './Space';
import spacing from '../base/Spacing';

const SplashContainer = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const LoadingContainer = styled.div`
  width: 300px;
`;

const Splash = () => (
  <SplashContainer>
    <img height="30px" src={logo} alt="logo" />
    <Space display="block" height={spacing.get('8x')} />
    <LoadingContainer>
      <LoadingBar />
    </LoadingContainer>
  </SplashContainer>
);

export default Splash;
