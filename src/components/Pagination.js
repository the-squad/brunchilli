import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import Button from './Button';
import Spinner from './Spinner';
import Center from './Center';
import Space from './Space';

import spacing from '../base/Spacing';

class Pagination extends Component {
  static propTypes = {
    onLoadMore: PropTypes.func,
    children: PropTypes.any,
    isLoading: PropTypes.bool,
    disable: PropTypes.bool,
  };

  constructor(props) {
    super(props);

    this.currentPage = 1;
  }

  onClick = () => {
    this.currentPage += 1;
    this.props.onLoadMore(this.currentPage);
  };

  render() {
    const { children, isLoading, disable } = this.props;
    return (
      <Fragment>
        {children}
        <Space display="block" height={spacing.get('4x')} />
        <Center>
          {isLoading ? (
            <Spinner radius={25} />
          ) : (
            !disable && (
              <Button primary={false} onClick={this.onClick}>
                Load more
              </Button>
            )
          )}
        </Center>
      </Fragment>
    );
  }
}

export default Pagination;
