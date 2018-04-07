import React, { Component } from 'react';
import PropTypes from 'prop-types';
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

import User from '../models/User';
import CartModel from '../models/Cart';

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
  static propTypes = {
    history: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.cart = new CartModel();

    this.state = {
      items: this.cart.getCart() || new Map(),
      total: this.calculateTotal(this.cart.getCart()) || 0,
    };
  }

  onCheckout = () => {
    const user = new User();
    this.cart.setCart(this.state.items);
    if (user.isUserExists()) {
      // TODO: checkout
    } else {
      this.props.history.push('/login?callbackUrl=results');
    }
  };

  addToCart = ({ id, name, price, count = 1 }) => {
    this.setState(prevState => {
      const newItems = new Map(prevState.items);
      const alreadyExistedItem = prevState.items.get(id);

      if (alreadyExistedItem) {
        const newCount = alreadyExistedItem.count + 1;
        const newTotal = (alreadyExistedItem.price * newCount).toFixed(2);
        newItems.set(id, {
          ...alreadyExistedItem,
          count: newCount,
          total: parseFloat(newTotal),
        });
      } else {
        newItems.set(id, {
          id,
          name,
          price,
          count,
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
    total = parseFloat(total);

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
          <Price price={parseFloat(total)} />
        </TotalContainer>

        <Space display="block" height={Spacing.get('6x')} />

        <Button width="100%" disabled={items.size === 0} onClick={this.onCheckout}>
          Checkout
        </Button>
      </CartContainer>
    );
  }
}

export default Cart;
