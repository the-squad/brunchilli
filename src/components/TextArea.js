import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Spacing from '../base/Spacing';
import Colors from '../base/Colors';
import { FontSizes, FontTypes, FontWeights } from '../base/Fonts';

const StyledTextArea = styled.textarea`
  border: none;
  height: ${props => props.height};
  width: ${props => (props.width ? props.width : '100%')};
  padding: 0;
  resize: none;
  outline: none;
  font-size: ${FontSizes[FontTypes.Body]};
  font-weight: ${FontWeights.normal};
  color: ${Colors.black};
  padding-top: ${Spacing.get('1x')};
`;

class TextArea extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    callbackParams: PropTypes.any,
  };

  static defaultProps = {
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
