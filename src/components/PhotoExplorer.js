import React, { Component } from 'react';

class PhotoExplorer extends Component {
  onChange = () => {};

  setProps = (onChange, callbackParams) => {
    this.onChange = onChange;
    this.callbackParams = callbackParams;
  };

  callbackParams;

  uploadPhoto = () => {
    const { files } = this.photoInput;
    const uploadedFiles = [];
    let loadedPhotos = -1;

    Array.from(files).map(file => {
      const picReader = new FileReader();
      picReader.onloadend = () => {
        uploadedFiles.push(picReader.result);
        loadedPhotos += 1;
        if (loadedPhotos === Array.from(files).length - 1) {
          this.onChange(uploadedFiles, this.callbackParams);
          this.photoInput.value = '';
        }
      };
      picReader.readAsDataURL(file);
    });
  };

  click = () => {
    this.photoInput.click();
  };

  render() {
    return (
      <input
        type="file"
        multiple
        accept=".png,.jpg,.jpeg"
        onChange={this.uploadPhoto}
        ref={photoInput => {
          this.photoInput = photoInput;
        }}
        style={{ display: 'none' }}
      />
    );
  }
}

export default PhotoExplorer;
