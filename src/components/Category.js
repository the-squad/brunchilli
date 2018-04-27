import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Axios from 'axios';

import Icon from './Icon';
import IconLoader from './IconLoader';

import Colors from '../base/Colors';
import { FontSizes, FontTypes } from '../base/Fonts';
import Spacing from '../base/Spacing';
import Space from './Space';

import Urls from '../Urls';

const CategoryContainer = styled.div`
  background: #f5f5f5;
  border-radius: 60px;
  padding: 0 16px;
  padding-right: 0;
  width: min-content;
  height: 38px;
  display: flex;
  align-items: center;
  margin-right: ${Spacing.get('3x')};
  margin-bottom: ${Spacing.get('3x')};
`;

const CategoryInput = styled.div`
  border: none;
  outline: none;
  font-size: ${FontSizes[FontTypes.Body]};
  line-height: ${FontSizes[FontTypes.Body]};
  color: ${Colors.black};
  background-color: transparent;
  width: max-content;
`;

const DeleteButton = styled.button`
  width: 38px;
  height: 38px;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 60px;
  border: none;
  outline: none;
`;

class Category extends Component {
  static propTypes = {
    name: PropTypes.string,
    id: PropTypes.number,
    onDelete: PropTypes.func,
  };

  static defaultProps = {
    onDelete: () => {},
  };

  onEdit = () => {
    const name = this.categoryInput.innerHTML;

    const { id } = this.props;
    const editBody = {
      name,
    };

    Axios.put(`${Urls.editCategory}/${id}`, editBody);
  };

  onDelete = () => {
    const { id, onDelete } = this.props;
    Axios.delete(`${Urls.deleteCategory}/${id}`).then(() => {
      onDelete(id);
    });
  };

  render() {
    const { name } = this.props;

    return (
      <CategoryContainer>
        <CategoryInput
          innerRef={categoryInput => {
            this.categoryInput = categoryInput;
          }}
          onBlur={this.onEdit}
          contentEditable="true"
        >
          {name}
        </CategoryInput>

        <Space width={Spacing.get('2x')} />

        <DeleteButton onClick={this.onDelete}>
          <Icon icon={IconLoader.getInstance().get('close')} color={Colors.black} width={20} />
        </DeleteButton>
      </CategoryContainer>
    );
  }
}

export default Category;
