import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import QueryString from 'query-string';
import styled from 'styled-components';
import Axios from 'axios';

import FoodCard from '../components/FoodCard';
import Cart from '../components/Cart';
import FoodItemModal from '../components/FoodItemModal';
import SearchBar from '../components/SearchBar';
import Space from '../components/Space';
import Text from '../components/Text';
import Pagination from '../components/Pagination';

import { FontTypes } from '../base/Fonts';
import Colors from '../base/Colors';
import Spacing from '../base/Spacing';

import keyGenerator from '../KeyGenerator';
import Urls from '../Urls';
import EmptyState from '../components/EmptyState';

const SearchGrid = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  width: 100%;
  padding: ${Spacing.get('4x')} ${Spacing.get('10x')};
  grid-column-gap: ${Spacing.get('4x')};
`;

const CardsList = styled.div`
  display: grid;
  grid-template-columns: auto;
  grid-auto-rows: auto;
  grid-row-gap: ${Spacing.get('3x')};
`;

class Search extends Component {
  static propTypes = {
    history: PropTypes.object,
  };

  constructor(props) {
    super(props);

    document.body.style.background = Colors.light;

    const queryString = QueryString.parse(window.location.search);
    this.searchQuery = queryString.search;
  }

  state = {
    searchResults: [],
    isLoadingMore: false,
    disableLoadMore: true,
  };

  componentDidMount() {
    this.search();
  }

  onSearch = query => {
    const queryString = `search=${query}`;
    this.props.history.push(`/results/?${queryString}`);

    this.search();
  };

  onLoadMore = () => {
    // TODO: connect with searchAPI
    this.setState({
      isLoadingMore: true,
    });
  };

  search = () => {
    const queryString = QueryString.parse(window.location.search);
    const searchQuery = queryString.search || '';
    Axios.get(`${Urls.search}?query=${searchQuery}`).then(response => {
      this.setState({
        searchResults: response.data.data,
      });
    });
  };

  showFoodItemModal = foodDetails => {
    this.foodItemModal.openModal(foodDetails);
  };

  addItemToCart = item => this.cart.addToCart(item);

  render() {
    const { isLoadingMore, searchResults, disableLoadMore } = this.state;

    return (
      <Fragment>
        <FoodItemModal
          ref={foodItemModal => {
            this.foodItemModal = foodItemModal;
          }}
        />
        <SearchGrid>
          <div>
            <SearchBar small query={this.searchQuery} onSearch={this.onSearch} />

            <Space display="block" height={Spacing.get('4x')} />

            <Text type={FontTypes.Heading} color={Colors.grey}>
              Search results:
            </Text>

            <Space display="block" height={Spacing.get('4x')} />

            <Pagination
              onLoadMore={this.onLoadMore}
              isLoading={isLoadingMore}
              disable={disableLoadMore}
            >
              {searchResults.length === 0 ? (
                <EmptyState icon="search" text="No items matched your search" />
              ) : (
                <CardsList>
                  {searchResults.map(item => (
                    <FoodCard
                      key={keyGenerator('food')}
                      id={item.id}
                      photos={item.photos}
                      name={item.name}
                      desc={item.desc}
                      category={item.category}
                      rate={item.rate}
                      price={item.price}
                      comments={item.comments}
                      showFoodDetails={this.showFoodItemModal}
                      onAddToCartClick={this.addItemToCart}
                    />
                  ))}
                </CardsList>
              )}
            </Pagination>
          </div>
          <Cart
            ref={cart => {
              this.cart = cart;
            }}
            {...this.props}
          />
        </SearchGrid>
      </Fragment>
    );
  }
}

export default Search;
