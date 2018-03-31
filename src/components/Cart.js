import React, { Component } from 'react';
import styled from 'styled-components';

import Icon from './Icon';
import IconLoader from './IconLoader';
import Text from './Text';
import CenterVertical from './CenterVertical';
import Space from './Space';
import CartItem from './CartItem';
import Button from './Button';
import EmptyState from './EmptyState';

import { FontTypes } from '../base/Fonts';
import Spacing from '../base/Spacing';
import Colors from '../base/Colors';
import keyGenerator from '../KeyGenerator';
import Price from './Price';

const CartContainer = styled.div`
  padding: ${Spacing.get('6x')};
  width: 400px;
  background-color: ${Colors.white};
  border-radius: 4px;
  height: max-content;
`;

const ItemsList = styled.div`
  display: grid;
  grid-auto-rows: auto;
  grid-row-gap: ${Spacing.get('4x')};
`;

const TotalContainer = styled.div`
  display: grid;
  grid-template-columns: 70% 30%;
  align-items: center;
  justify-items: flex-end;
`;

class Cart extends Component {
  state = {
    items: new Map(),
    total: 0,
  };

  addToCart = ({ id, name, price, count = 1, deleteCallback }) => {
    this.setState(prevState => {
      const newItems = new Map(prevState.items);
      const alreadyExistedItem = prevState.items.get(id);

      if (alreadyExistedItem) {
        newItems.delete(alreadyExistedItem.id);
      } else {
        newItems.set(id, {
          id,
          name,
          price,
          count,
          deleteCallback,
          total: price,
        });
      }

      return {
        items: newItems,
        total: this.calculateTotal(newItems),
      };
    });
  };

  updateItemCount = (id, count, total) => {
    this.setState(prevState => {
      const newItems = prevState.items;
      const itemToBeUpdated = newItems.get(id);
      itemToBeUpdated.count = count;
      itemToBeUpdated.total = total;

      newItems.set(id, itemToBeUpdated);

      return {
        items: newItems,
        total: this.calculateTotal(newItems),
      };
    });
  };

  removeFromCart = id => {
    this.setState(prevState => {
      const newItems = prevState.items;
      const itemToBeDeleted = newItems.get(id);
      itemToBeDeleted.deleteCallback();
      newItems.delete(id);

      return {
        items: newItems,
        total: this.calculateTotal(newItems),
      };
    });
  };

  calculateTotal = items => {
    let total = 0;
    const itemsArray = Array.from(items.values());
    itemsArray.forEach(item => {
      const itemTotal = item.count * item.price;
      total += itemTotal;
    });

    return total.toFixed(2);
  };

  render() {
    const { items, total } = this.state;
    const itemsValues = Array.from(items.values());

    return (
      <CartContainer>
        <CenterVertical>
          <Icon icon={IconLoader.getInstance().get('cart')} color={Colors.black} width={20} />
          <Space width={Spacing.get('3x')} />
          <Text type={FontTypes.Title}>Your cart</Text>
        </CenterVertical>

        <Space display="block" height={Spacing.get('6x')} />

        {items.size === 0 ? (
          <EmptyState text="Your cart is empty. Start adding items to be displayed here" />
        ) : (
          <ItemsList>
            {itemsValues.map(item => (
              <CartItem
                key={keyGenerator('cart')}
                onCountChange={this.updateItemCount}
                onRemove={this.removeFromCart}
                {...item}
              />
            ))}
          </ItemsList>
        )}

        <Space display="block" height={Spacing.get('6x')} />

        <TotalContainer>
          <Text>Total: </Text>
          <Price price={total} />
        </TotalContainer>

        <Space display="block" height={Spacing.get('6x')} />

        <Button width="100%" disabled={items.size === 0}>
          Checkout
        </Button>
      </CartContainer>
    );
  }
}

export default Cart;
