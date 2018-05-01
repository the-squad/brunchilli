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
  font-size: ${props => (props.small ? FontSizes[FontTypes.Heading] : FontSizes[FontTypes.Title])};
  color: ${Colors.black};
  display: block;
  width: 90%;
`;

const FullWidth = styled.div`
  width: 100%;
`;

class SearchBar extends Component {
  static propTypes = {
    onTyping: PropTypes.func,
    onSearch: PropTypes.func,
    small: PropTypes.bool,
    query: PropTypes.string,
  };

  static defaultProps = {
    onTyping: () => {},
    onSearch: () => {},
  };

  state = {
    query: this.props.query,
  };

  onTyping = e => {
    const query = e.target.value;
    this.setState(() => {
      this.props.onTyping(query);
      return {
        query,
      };
    });
  };

  onSearch = () => {
    const { query } = this.state;
    this.props.onSearch(query);
  };

  render() {
    const { small } = this.props;
    const { query } = this.state;
    const buttonHeight = small ? 32 : 46;
    const buttonFontSize = small ? FontSizes[FontTypes.Body] : FontSizes[FontTypes.Title];
    const buttonPadding = small ? Spacing.get('3x') : Spacing.get('5x');
    const iconWidth = small ? 16 : 21;

    return (
      <SearchBarContainer {...this.props}>
        <FullWidth>
          <CenterVertical>
            <Space width={Spacing.get('2x')} />
            <Icon
              icon={IconLoader.getInstance().get('search')}
              width={iconWidth}
              color={Colors.grey}
            />
            <Space width={Spacing.get('3x')} />
            <SearchField
              small={small}
              value={query}
              placeholder="Try 'Mac & Cheese'"
              onChange={this.onTyping}
            />
          </CenterVertical>
        </FullWidth>
        <Button
          padding={buttonPadding}
          height={buttonHeight}
          fontWeight={FontWeights.light}
          fontSize={buttonFontSize}
          onClick={this.onSearch}
        >
          Search
        </Button>
      </SearchBarContainer>
    );
  }
}

export default SearchBar;
