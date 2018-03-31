import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Counter from './Counter';
import Text from './Text';
import Button from './Button';
import Price from './Price';

import { FontTypes, FontWeights } from '../base/Fonts';
import Colors from '../base/Colors';

const CartItemContainer = styled.div`
  display: grid;
  grid-template-columns: 39% 28% 29%;
  grid-template-rows: auto auto;
  grid-template-areas: 'name count total' 'remove count total';
  grid-column-gap: 2%;
  align-items: center;
`;

const NameContainer = styled.div`
  grid-area: name;
`;

const RemoveContainer = styled.div`
  grid-area: remove;
`;

const CountContainer = styled.div`
  grid-area: count;
  justify-self: center;
`;

const TotalContainer = styled.div`
  grid-area: total;
  justify-self: flex-end;
`;

const RemoveButton = Button.extend`
  padding: 0;
  height: 24px;
`;

class CartItem extends Component {
  static propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.number,
    count: PropTypes.number,
    total: PropTypes.number,
    onRemove: PropTypes.func,
    onCountChange: PropTypes.func,
  };

  calculateTotal = count => {
    const { id, price } = this.props;
    let total = (count * price).toFixed(2);
    total = parseFloat(total);
    this.props.onCountChange(id, count, total);
  };

  removeItem = () => {
    const { onRemove, id } = this.props;
    onRemove(id);
  };

  render() {
    const { name, total, count } = this.props;

    return (
      <CartItemContainer>
        <NameContainer>
          <Text type={FontTypes.Body} tag="h2" fontWeight={FontWeights.normal} color={Colors.grey}>
            {name}
          </Text>
        </NameContainer>

        <RemoveContainer>
          <RemoveButton primary={false} onClick={this.removeItem}>
            Remove
          </RemoveButton>
        </RemoveContainer>

        <CountContainer>
          <Counter onChange={this.calculateTotal} count={count} />
        </CountContainer>

        <TotalContainer>
          <Price price={parseFloat(total)} color={Colors.black} />
        </TotalContainer>
      </CartItemContainer>
    );
  }
}

export default CartItem;
