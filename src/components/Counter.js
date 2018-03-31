import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Space from './Space';
import CenterVertical from './CenterVertical';
import Icon from './Icon';
import IconLoader from './IconLoader';

import { FontSizes, FontTypes, FontWeights } from '../base/Fonts';
import Colors from '../base/Colors';
import Spacing from '../base/Spacing';

const ADD = 1;
const REMOVE = -1;
const numberRegex = /[0-9]|\./;

const ButtonContainer = styled.button`
  width: 30px;
  height: 30px;
  background: ${Colors.light};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: none;
  outline: none;
`;

const CounterField = styled.input`
  border: none;
  color: ${Colors.black};
  font-display: fallback;
  font-size: ${FontSizes[FontTypes.Body]};
  line-height: ${FontSizes[FontTypes.Body]};
  font-weight: ${FontWeights.normal};
  outline: none;
  width: 20px;
  text-align: center;
`;

class Counter extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    count: PropTypes.number,
  };

  onChange = (count, forceReplace = false) => {
    let newCount = parseInt(count);
    if (!forceReplace) {
      newCount = this.props.count + count;
    }

    if (newCount <= 0 || !numberRegex.test(count)) {
      return {
        count: this.props.count,
      };
    }

    this.props.onChange(newCount);
  };

  render() {
    const { count } = this.props;

    return (
      <CenterVertical>
        <ButtonContainer onClick={() => this.onChange(REMOVE)}>
          <Icon icon={IconLoader.getInstance().get('minus')} width={13} color={Colors.primary} />
        </ButtonContainer>
        <Space width={Spacing.get('2x')} />
        <CounterField value={count} onChange={e => this.onChange(e.target.value, true)} />
        <Space width={Spacing.get('2x')} />
        <ButtonContainer onClick={() => this.onChange(ADD)}>
          <Icon icon={IconLoader.getInstance().get('plus')} width={13} color={Colors.primary} />
        </ButtonContainer>
      </CenterVertical>
    );
  }
}

export default Counter;
