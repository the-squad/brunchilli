import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { FontSizes, FontTypes, FontWeights } from '../base/Fonts';
import Colors from '../base/Colors';
import Spacing from '../base/Spacing';
import Button from '../components/Button';
import Icon from './Icon';
import IconLoader from './IconLoader';
import CenterVertical from './CenterVertical';
import Space from './Space';

const SearchBarContainer = styled.div`
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 4px;
  padding: ${Spacing.get('2x')};
  width: 800px;
`;

const SearchField = styled.input`
  border: none;
  outline: none;
  font-size: ${FontSizes[FontTypes.Title]};
  color: ${Colors.black};
`;

class SearchBar extends Component {
  static propTypes = {
    onTyping: PropTypes.func,
    onSearch: PropTypes.func,
  };

  static defaultProps = {
    onTyping: () => {},
    onSearch: () => {},
  };

  onTyping = e => {
    this.query = e.target.value;
    this.props.onTyping(this.query);
  };

  onSearch = () => {
    this.props.onSearch(this.query);
  };

  render() {
    return (
      <SearchBarContainer>
        <div>
          <CenterVertical>
            <Space width={Spacing.get('2x')} />
            <Icon icon={IconLoader.getInstance().get('search')} width={21} color={Colors.grey} />
            <Space width={Spacing.get('3x')} />
            <SearchField placeholder="Try 'Mac & Cheese'" onKeyDown={this.onTyping} />
          </CenterVertical>
        </div>
        <Button
          padding={Spacing.get('5x')}
          height={46}
          fontWeight={FontWeights.light}
          fontSize={FontSizes[FontTypes.Title]}
          onClick={this.onSearch}
        >
          Search
        </Button>
      </SearchBarContainer>
    );
  }
}

export default SearchBar;
