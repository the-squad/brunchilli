let instance = null;

class IconLoader {
  static getInstance() {
    if (!instance) {
      instance = new IconLoader();
    }

    return instance;
  }

  setIconStore = iconsStore => {
    this.icons = iconsStore;
  };

  get = name => {
    let requestedIcon;

    this.icons.icons.forEach(icon => {
      if (icon.properties.name === name) {
        requestedIcon = icon;
      }
    }, this);

    return requestedIcon;
  };
}

export default IconLoader;
