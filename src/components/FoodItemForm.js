import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Axios from 'axios';
import HttpsStatus from 'http-status-codes';

import Modal from './Modal';
import InputField from './InputField';
import Select from './Select';
import PhotosSlider from './PhotosSlider';
import TextArea from './TextArea';
import Button from './Button';
import Space from './Space';

import Colors from '../base/Colors';
import Spacing from '../base/Spacing';
import Urls from '../Urls';
import PhotosPreview from './PhotosPreview';

const ModalContainer = styled.div`
  padding: ${Spacing.get('4x')} ${Spacing.get('6x')} ${Spacing.get('6x')};
`;

const FirstRowContainer = styled.div`
  display: grid;
  grid-template-columns: 48% 48%;
  grid-column-gap: 4%;
`;

const FormContainer = styled.div`
  display: grid;
  grid-auto-rows: auto;
  grid-row-gap: ${Spacing.get('6x')};
  width: 100%;
`;

const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

let counter = -1;
const createPhotoId = () => {
  counter += 1;
  return counter;
};

class FoodItemForm extends Component {
  static propTypes = {
    onItemSave: PropTypes.func,
  };

  static defaultProps = {
    onItemSave: () => {},
  };

  state = {
    photos: new Map(),
    selectedPhotoKey: 0,
    name: undefined,
    categories: [],
    price: undefined,
    desc: undefined,
    category: undefined,
    isLoading: false,
  };

  componentDidMount() {
    Axios.get(Urls.getCategories).then(response =>
      this.setState({
        categories: response.data.data,
      }),
    );
  }

  onSave = () => {
    const { isEditMode } = this.state;
    const { onItemSave } = this.props;

    this.setState({
      isLoading: true,
    });

    if (isEditMode) {
      // TODO: edit mode
    } else {
      const { name, desc, price, category, photos } = this.state;
      const addItemBody = {
        name,
        description: desc,
        price,
        category_id: category.value,
        img: Array.from(photos.values()),
      };

      Axios.post(Urls.addFood, addItemBody).then(response => {
        this.setState({
          isLoading: false,
        });

        if (response.status === HttpsStatus.OK || response.status === HttpsStatus.CREATED) {
          this.modal.closeModal();
          onItemSave(response.data.data);
        }
      });
    }
  };

  onDelete = () => {
    Axios.delete(Urls.deleteFood);
  };

  updateState = (value, key) => {
    this.setState({
      [key]: value,
    });
  };

  showModal = ({ photos, name, price, desc, categoryId }) => {
    const photosMap = new Map();
    photos && photos.forEach(photo => photosMap.set(createPhotoId(), photo));

    this.modal.openModal();
    this.setState({
      photos: photosMap,
      name,
      price,
      desc,
      category: categoryId,
      selectedPhotoKey: photosMap.keys().next().value,
      isEditMode: name,
    });
  };

  convertImgToBase64URL = (url, callback, outputFormat) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = () => {
      let canvas = document.createElement('CANVAS');
      const ctx = canvas.getContext('2d');

      canvas.height = img.height;
      canvas.width = img.width;
      ctx.drawImage(img, 0, 0);
      const dataURL = canvas.toDataURL(outputFormat);
      callback(dataURL);
      canvas = null;
    };
    img.src = url;
  };

  changeCoverPreview = key => {
    this.setState({
      selectedPhotoKey: key,
    });
  };

  changeSelectedPhotoIndex = index => {
    this.setState(prevState => {
      const key = Array.from(prevState.photos.entries())[index][0];
      return {
        selectedPhotoKey: key,
      };
    });
  };

  addPhoto = photos => {
    this.setState(prevState => {
      const newPhotos = prevState.photos;
      photos.map(photo => newPhotos.set(createPhotoId(), photo));

      return {
        photos: newPhotos,
      };
    });
  };

  deletePhoto = key => {
    this.setState(prevState => {
      const newPhotos = prevState.photos;
      newPhotos.delete(key);
      return {
        photos: newPhotos,
        selectedPhotoKey:
          prevState.selectedPhotoKey === key
            ? newPhotos.keys().next().value
            : prevState.selectedPhotoKey,
      };
    });
  };

  render() {
    const {
      photos,
      selectedPhotoKey,
      name,
      price,
      desc,
      category,
      categories,
      isLoading,
    } = this.state;
    const categoriesList = categories.map(categoryItem => ({
      value: categoryItem.id,
      label: categoryItem.name,
    }));
    const selectedPhotoIndex = Array.from(photos.keys()).findIndex(key => key === selectedPhotoKey);
    let previewPhotos = [];

    if (photos.size === 0) {
      previewPhotos.push('http://www.iberocons.com/en/wp-content/uploads/2014/04/placeholder4.png');
    } else {
      previewPhotos = Array.from(photos.values());
    }

    return (
      <Modal
        ref={modal => {
          this.modal = modal;
        }}
      >
        <PhotosSlider
          photos={previewPhotos}
          slideIndex={photos.size === 0 ? 0 : selectedPhotoIndex}
          afterSlide={this.changeSelectedPhotoIndex}
        />

        <ModalContainer>
          <Space display="block" height={Spacing.get('2x')} />
          <PhotosPreview
            photos={photos}
            photoRadius={53}
            onAdd={this.addPhoto}
            onSelect={this.changeCoverPreview}
            onDelete={this.deletePhoto}
            selectedPhotoKey={selectedPhotoKey}
            {...this.props}
          />
          <Space display="block" height={Spacing.get('2x')} />

          <FirstRowContainer>
            <InputField
              placeholder="Name"
              value={name}
              onChange={this.updateState}
              callbackParams="name"
              isRequired
              width={200}
            />
            <InputField
              placeholder="Price"
              value={price}
              onChange={this.updateState}
              callbackParams="price"
              isRequired
              width={200}
            />
          </FirstRowContainer>
          <FormContainer>
            <TextArea
              placeholder="Description"
              value={desc}
              onChange={this.updateState}
              callbackParams="desc"
            />
            <Select
              name="form-field-name"
              value={category}
              onChange={value => this.updateState(value, 'category')}
              options={categoriesList}
            />
          </FormContainer>

          <Space display="block" height={Spacing.get('4x')} />

          <ButtonsContainer>
            <Button primary={false} color={Colors.danger}>
              Delete
            </Button>
            <Space width={Spacing.get('4x')} />
            <Button onClick={this.onSave} disabled={isLoading}>
              Save Changes
            </Button>
          </ButtonsContainer>
        </ModalContainer>
      </Modal>
    );
  }
}

export default FoodItemForm;
