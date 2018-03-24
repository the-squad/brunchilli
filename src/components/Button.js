import styled from 'styled-components';
import PropTypes from 'prop-types';

import Colors from '../base/Colors';
import Spacing from '../base/Spacing';
import { FontSizes, FontTypes, FontWieghts } from '../base/Fonts';

const Button = styled.button`
  border-radius: 4px;
  height: ${props => props.height}px;
  padding: 0 ${props => props.padding};
  font-size: ${props => props.fontSize};
  font-weight: ${props => props.fontWeight};
  color: ${props => (props.primary ? '#fff' : props.color)};
  background-color: ${props => (props.primary ? props.color : 'transparent')};
  border: 1px solid;
  border-color: ${props => (props.primary ? props.color : 'transparent')};
  outline: none;
  cursor: pointer;
  box-shadow: none;
`;

Button.propTypes = {
  fontSize: PropTypes.oneOf(Object.values(FontSizes)),
  fontWeight: PropTypes.oneOf(Object.values(FontWieghts)),
  color: PropTypes.oneOf(Object.values(Colors)),
  primary: PropTypes.bool,
  height: PropTypes.number,
  padding: PropTypes.oneOf(Array.from(Spacing.values())),
};

Button.defaultProps = {
  fontSize: FontSizes[FontTypes.Body],
  fontWeight: FontWieghts.normal,
  color: Colors.primary,
  primary: true,
  height: 34,
  padding: Spacing.get('4x'),
};

export default Button;
