import React, { Component } from 'react';
import styled from 'styled-components';
import Axios from 'axios';
import HttpsStatus from 'http-status-codes';

import Text from '../components/Text';
import Space from '../components/Space';
import SpaceBetween from '../components/SpaceBetween';
import Button from '../components/Button';
import InputField from '../components/InputField';
import EmptyState from '../components/EmptyState';
import Center from '../components/Center';
import Spinner from '../components/Spinner';

import { FontTypes } from '../base/Fonts';
import Colors from '../base/Colors';
import Spacing from '../base/Spacing';

import Urls from '../Urls';
import Category from '../components/Category';
import CenterVertical from '../components/CenterVertical';

const CategoriesListContainer = styled.div`
  width: 100%;
  padding: ${Spacing.get('4x')} ${Spacing.get('10x')};
  margin-bottom: ${Spacing.get('4x')};
`;

const CategoriesFlex = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const FullContent = styled.div`
  height: 50vh;
`;

class CategoriesList extends Component {
  constructor(props) {
    super(props);

    document.body.style.background = Colors.white;
  }

  state = { categories: new Map(), newCategory: '', isAdding: false, isLoading: true };

  componentDidMount() {
    Axios.get(Urls.getCategories).then(response => {
      const categories = new Map();
      response.data.data.forEach(category => categories.set(category.id, category));
      this.setState({
        categories,
        isLoading: false,
      });
    });
  }

  addCategory = () => {
    const { newCategory } = this.state;
    if (!newCategory) {
      this.categoryField.showErrorMessage('Category can not be empty');
      return true;
    }

    this.setState({
      isAdding: true,
    });

    const addCategoryBody = {
      name: newCategory,
    };

    Axios.post(Urls.addCategory, addCategoryBody).then(response => {
      if (response.status === HttpsStatus.OK) {
        this.setState(prevState => {
          const newCategories = prevState.categories;
          const { id } = response.data;
          newCategories.set(id, { id, name: newCategory });

          return {
            isAdding: false,
            categories: newCategories,
            newCategory: '',
          };
        });
      }
    });
  };

  deleteCategory = id => {
    this.setState(prevState => {
      const newCategories = prevState.categories;
      newCategories.delete(id);

      return {
        categories: newCategories,
      };
    });
  };

  render() {
    const { categories, newCategory, isAdding, isLoading } = this.state;

    return (
      <CategoriesListContainer>
        <Space display="block" height={Spacing.get('6x')} />
        <SpaceBetween>
          <div>
            <Text type={FontTypes.BigTitle}>Categories List</Text>
            <Space display="block" height={Spacing.get('2x')} />
            <Text type={FontTypes.Heading} color={Colors.grey}>
              Control the food categories
            </Text>
          </div>

          <CenterVertical>
            <InputField
              hideErrorMessage
              placeholder="Category"
              value={newCategory}
              ref={categoryField => {
                this.categoryField = categoryField;
              }}
              onChange={category =>
                this.setState({
                  newCategory: category,
                })
              }
            />
            <Space width={Spacing.get('2x')} />
            <Button disabled={isAdding} primary={false} onClick={this.addCategory}>
              Add Category
            </Button>
          </CenterVertical>
        </SpaceBetween>

        <Space display="block" height={Spacing.get('10x')} />

        {isLoading && (
          <FullContent>
            <Center>
              <Spinner radius={60} />{' '}
            </Center>
          </FullContent>
        )}

        {!isLoading &&
          (categories.size !== 0 ? (
            <CategoriesFlex>
              {Array.from(categories.values()).map(category => (
                <Category key={`cat-${category.id}`} {...category} onDelete={this.deleteCategory} />
              ))}
            </CategoriesFlex>
          ) : (
            <FullContent>
              <EmptyState text="You don't have any categories" />
            </FullContent>
          ))}
      </CategoriesListContainer>
    );
  }
}

export default CategoriesList;
