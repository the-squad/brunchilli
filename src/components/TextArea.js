import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Spacing from '../base/Spacing';
import Colors from '../base/Colors';
import { FontSizes, FontTypes, FontWeights } from '../base/Fonts';

const StyledTextArea = styled.textarea`
  border: ${props => (props.showBorder ? `1px solid ${Colors.grey}` : 'none')};
  border-radius: ${props => (props.showBorder ? '4px' : 0)};
  height: ${props => props.height};
  width: ${props => (props.width ? props.width : '100%')};
  padding: ${props => (props.showBorder ? Spacing.get('2x') : 0)};
  resize: none;
  outline: none;
  font-size: ${FontSizes[FontTypes.Body]};
  font-weight: ${FontWeights.normal};
  color: ${Colors.black};
  padding-top: ${props => (props.showBorder ? Spacing.get('2x') : Spacing.get('1x'))};

  &:focus {
    border-color: ${Colors.primary};
  }
`;

class TextArea extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    callbackParams: PropTypes.any,
    showBorder: PropTypes.bool,
  };

  static defaultProps = {
    showBorder: true,
    onChange: () => {},
  };

  onChange = e => {
    const { onChange, callbackParams } = this.props;
    const { value } = e.target;
    onChange(value, callbackParams);
  };

  render() {
    return <StyledTextArea {...this.props} onChange={this.onChange} />;
  }
}

export default TextArea;
