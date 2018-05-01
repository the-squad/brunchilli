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
import PhotosPreview from './PhotosPreview';

import Colors from '../base/Colors';
import Spacing from '../base/Spacing';
import { FontSizes, FontTypes, FontWeights } from '../base/Fonts';
import Urls from '../Urls';
import validateFields from '../utils/ValidateFields';

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
  grid-row-gap: ${Spacing.get('7x')};
  width: 100%;
`;

const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const PhotosErrorMessage = styled.label`
  font-size: ${FontSizes[FontTypes.Caption]};
  color: ${Colors.danger};
  font-weight: ${FontWeights.normal};
  display: ${props => (props.show ? 'block' : 'none')};
`;

let counter = -1;
const createPhotoId = () => {
  counter += 1;
  return counter;
};

class FoodItemForm extends Component {
  static propTypes = {
    onItemSave: PropTypes.func,
    onItemDelete: PropTypes.func,
  };

  static defaultProps = {
    onItemSave: () => {},
    onItemDelete: () => {},
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
    showPhotosErrorMessage: false,
  };

  componentDidMount() {
    Axios.get(Urls.getCategories).then(response =>
      this.setState({
        categories: response.data.data,
      }),
    );
  }

  onSave = async () => {
    const { isEditMode, id, name, desc, price, category } = this.state;
    const { onItemSave } = this.props;
    let { photos } = this.state;
    const requiredFields = [this.nameField, this.priceField];
    let response;

    if (photos.size === 0) {
      this.setState({
        showPhotosErrorMessage: true,
      });
      return;
    } else if (!validateFields(requiredFields)) {
      return;
    }

    this.setState({
      isLoading: true,
    });

    if (isEditMode) {
      photos = await Promise.all(
        Array.from(this.state.photos.values()).map(async photo => {
          let convertedPhoto = photo;
          if (photo.includes('http')) {
            convertedPhoto = await this.convertImgToBase64URL(photo);
          }
          return convertedPhoto;
        }),
      );
    }

    const addItemBody = {
      name,
      description: desc,
      price,
      category_id: category && category.value ? category.value : category,
      img: Array.from(photos.values()),
    };

    try {
      if (isEditMode) {
        response = await Axios.put(`${Urls.editFood}/${id}`, addItemBody);
      } else {
        response = await Axios.post(Urls.addFood, addItemBody);
      }
    } finally {
      this.setState({
        isLoading: false,
      });
    }

    if (response.status === HttpsStatus.OK || response.status === HttpsStatus.CREATED) {
      this.modal.closeModal();
      onItemSave(response.data.data);
    }
  };

  onDelete = () => {
    this.setState({
      isLoading: true,
    });

    const { id } = this.state;
    Axios.delete(`${Urls.deleteFood}/${id}`).then(response => {
      if (response.status === HttpsStatus.OK || response.status === HttpsStatus.CREATED) {
        this.modal.closeModal();
        this.props.onItemDelete(id);
      }
    });
  };

  updateState = (value, key) => {
    this.setState({
      [key]: value,
    });
  };

  showModal = ({ id, photos, name, price, desc, categoryId }) => {
    const photosMap = new Map();
    photos && photos.forEach(photo => photosMap.set(createPhotoId(), photo));

    this.modal.openModal();
    this.setState({
      id,
      photos: photosMap,
      name,
      price,
      desc,
      category: categoryId,
      selectedPhotoKey: photosMap.keys().next().value,
      isEditMode: name,
    });
  };

  convertImgToBase64URL = (url, outputFormat) =>
    new Promise(resolve => {
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.onload = () => {
        let canvas = document.createElement('CANVAS');
        const ctx = canvas.getContext('2d');

        canvas.height = img.height;
        canvas.width = img.width;
        ctx.drawImage(img, 0, 0);
        const dataURL = canvas.toDataURL(outputFormat);
        resolve(dataURL);
        canvas = null;
      };
      img.src = url;
    });

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
        showPhotosErrorMessage: false,
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
      showPhotosErrorMessage,
      isEditMode,
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

          <PhotosErrorMessage show={showPhotosErrorMessage}>
            You need to upload one photo at least
          </PhotosErrorMessage>

          <Space display="block" height={Spacing.get('2x')} />

          <FirstRowContainer>
            <InputField
              placeholder="Name"
              value={name}
              onChange={this.updateState}
              callbackParams="name"
              isRequired
              width={200}
              ref={nameField => {
                this.nameField = nameField;
              }}
            />
            <InputField
              placeholder="Price"
              value={price}
              onChange={this.updateState}
              callbackParams="price"
              isRequired
              width={200}
              ref={priceField => {
                this.priceField = priceField;
              }}
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
              required
            />
          </FormContainer>

          <Space display="block" height={Spacing.get('4x')} />

          <ButtonsContainer>
            {isEditMode && (
              <Button
                primary={false}
                disabled={isLoading}
                color={Colors.danger}
                onClick={this.onDelete}
              >
                Delete
              </Button>
            )}
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
