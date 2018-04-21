import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import IconLoader from './IconLoader';
import Icon from './Icon';
import Space from './Space';

import Spacing from '../base/Spacing';
import Colors from '../base/Colors';

import keyGenerator from '../KeyGenerator';

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
`;

const IconContainer = styled.div`
  cursor: ${props => (props.editable ? 'pointer' : 'default')};
`;

const rating = [1, 2, 3, 4, 5];

class Rate extends PureComponent {
  static propTypes = {
    rate: PropTypes.number,
    editable: PropTypes.bool,
    onChange: PropTypes.func,
    callbackParams: PropTypes.any,
  };

  static defaultProps = {
    editable: false,
    onChange: () => {},
  };

  setRate = rate => {
    const { editable, onChange, callbackParams } = this.props;
    if (!editable) return;
    onChange(rate + 1, callbackParams);
  };

  render() {
    const { rate, editable } = this.props;

    return (
      <RatingContainer>
        {rating.map((_, index) => (
          <Fragment key={keyGenerator('star')}>
            <IconContainer editable={editable}>
              <Icon
                icon={IconLoader.getInstance().get('star')}
                width={15}
                color={index < rate ? Colors.warning : Colors.grey}
                onClick={() => this.setRate(index)}
              />
            </IconContainer>
            <Space width={Spacing.get('1x')} />
          </Fragment>
        ))}
      </RatingContainer>
    );
  }
}

export default Rate;
