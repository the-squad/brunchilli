import styled from 'styled-components';
import PropTypes from 'prop-types';

import Colors from '../base/Colors';
import Spacing from '../base/Spacing';
import { FontSizes, FontTypes, FontWeights } from '../base/Fonts';

const Button = styled.button`
  border-radius: 4px;
  height: ${props => props.height}px;
  padding: 0 ${props => props.padding};
  font-size: ${props => props.fontSize};
  font-weight: ${props => props.fontWeight};
  color: ${props => {
    if (!props.disabled) {
      if (props.primary) {
        return '#fff';
      }
      return props.color;
    }
    return Colors.grey;
  }};
  background: ${props => {
    if (props.primary) {
      if (!props.disabled) {
        return props.color;
      }
      return Colors.light;
    }
    return 'transparent';
  }};
  border: ${props => props.primary && '1px solid'};
  border-color: ${props => {
    if (props.primary) {
      if (!props.disabled) {
        return props.color;
      }
      return Colors.light;
    }
    return 'transparent';
  }};
  outline: none;
  cursor: ${props => (props.disabled ? 'default' : 'pointer')};
  box-shadow: none;
  width: ${props => props.width};
`;

Button.propTypes = {
  fontSize: PropTypes.oneOf(Object.values(FontSizes)),
  fontWeight: PropTypes.oneOf(Object.values(FontWeights)),
  color: PropTypes.oneOf(Object.values(Colors)),
  primary: PropTypes.bool,
  height: PropTypes.number,
  padding: PropTypes.oneOf(Array.from(Spacing.values())),
  width: PropTypes.string,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  fontSize: FontSizes[FontTypes.Body],
  fontWeight: FontWeights.normal,
  color: Colors.primary,
  primary: true,
  height: 34,
  padding: Spacing.get('4x'),
  disabled: false,
};

export default Button;
