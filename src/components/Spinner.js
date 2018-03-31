import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Colors from '../base/Colors';
import { rotate, spin } from '../animations';

const Spinner = props => (
  <StyledSpinner {...props} viewBox="0 0 50 50">
    <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="4" />
  </StyledSpinner>
);

const StyledSpinner = styled.svg`
  animation: ${rotate} 1.5s linear infinite;
  width: ${props => props.radius}px;
  height: ${props => props.radius}px;

  & .path {
    stroke: ${props => props.color};
    stroke-linecap: round;
    animation: ${spin} 1.5s ease-in-out infinite;
  }
`;

Spinner.propTypes = {
  radius: PropTypes.number,
  color: PropTypes.string,
};

Spinner.defaultProps = {
  radius: 40,
  color: Colors.primary,
};

export default Spinner;
