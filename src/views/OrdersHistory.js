import React, { Component } from 'react';
import styled from 'styled-components';
import Axios from 'axios';

import Text from '../components/Text';
import Space from '../components/Space';
import OrderRow from '../components/OrderRow';

import { FontTypes } from '../base/Fonts';
import Spacing from '../base/Spacing';
import Colors from '../base/Colors';
import OrderDetails from '../components/OrderDetails';
import Urls from '../Urls';
import Center from '../components/Center';
import Spinner from '../components/Spinner';
import EmptyState from '../components/EmptyState';

const OrdersHistoryContainer = styled.div`
  width: 100%;
  padding: ${Spacing.get('4x')} ${Spacing.get('10x')};
  margin-bottom: ${Spacing.get('4x')};
`;

const OrdersHistoryGrid = styled.div`
  display: grid;
  grid-template-columns: 60% auto 34%;
  grid-column-gap: 3%;
  width: 100%;
`;

const OrdersHistoryList = styled.div`
  display: grid;
  grid-auto-rows: auto;
  grid-row-gap: ${Spacing.get('1x')};
`;

const Divider = styled.div`
  height: 100%;
  width: 1px;
  background-color: ${Colors.grey};
`;

const FullContent = styled.div`
  height: 50vh;
`;

class OrdersHistory extends Component {
  state = { orders: new Map(), currentSelectedItem: -1, orderDetails: [], isLoading: true };

  componentDidMount() {
    Axios.get(Urls.getOrders).then(response => {
      this.setState(() => {
        const orders = new Map();
        response.data.data.forEach(order => orders.set(order.orderId, order));

        return {
          orders,
          isLoading: false,
        };
      });
    });
  }

  showOrderDetails = (orderId, orderDetails) => {
    this.setState({
      currentSelectedItem: orderId,
      orderDetails,
    });
  };

  render() {
    const { orders, currentSelectedItem, orderDetails, isLoading } = this.state;

    return (
      <OrdersHistoryContainer>
        <Space display="block" height={Spacing.get('6x')} />
        <Text type={FontTypes.BigTitle}>Orders History</Text>
        <Space display="block" height={Spacing.get('2x')} />
        <Text type={FontTypes.Heading} color={Colors.grey}>
          You can see all orders history
        </Text>

        <Space display="block" height={Spacing.get('4x')} />

        {isLoading && (
          <FullContent>
            <Center>
              <Spinner radius={60} />
            </Center>
          </FullContent>
        )}

        {!isLoading &&
          (orders.size === 0 ? (
            <FullContent>
              <EmptyState text="There are no order history" />{' '}
            </FullContent>
          ) : (
            <OrdersHistoryGrid>
              <OrdersHistoryList>
                <OrderRow
                  name="Customer"
                  date="Date"
                  address="Address"
                  phoneNumber="Phone Number"
                  total="Total"
                  isHeader
                />

                {Array.from(orders.values()).map(order => {
                  let total = 0;
                  order.orderDetails.forEach(orderDetailsMap => {
                    total += orderDetailsMap.price * orderDetailsMap.amount;
                  });

                  return (
                    <OrderRow
                      isActive={order.orderId === currentSelectedItem}
                      id={order.orderId}
                      photo={order.photo}
                      name={order.name}
                      date={order.orderDate}
                      address={order.address}
                      phoneNumber={order.phoneNumber}
                      total={total}
                      items={order.orderDetails}
                      onClick={this.showOrderDetails}
                    />
                  );
                })}
              </OrdersHistoryList>

              <Divider />

              <OrderDetails items={orderDetails} />
            </OrdersHistoryGrid>
          ))}
      </OrdersHistoryContainer>
    );
  }
}

export default OrdersHistory;
