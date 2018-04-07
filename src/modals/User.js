let instance = null;

class User {
  static getInstance() {
    if (!instance) {
      instance = new User();
    }
    return instance;
  }

  constructor() {
    this.userId = undefined;
    this.name = undefined;
    this.email = undefined;
    this.address = undefined;
    this.phone = undefined;
  }

  isUserExists = () => !!this.userId;

  set userId(userId) {
    this.userId = userId;
  }

  get userId() {
    return this.userId;
  }

  set name(name) {
    this.name = name;
  }

  get name() {
    return this.name;
  }

  set email(email) {
    this.email = email;
  }

  get email() {
    return this.email;
  }

  set address(address) {
    this.address = address;
  }

  get address() {
    return this.address;
  }

  set phone(phone) {
    this.phone = phone;
  }

  get phone() {
    return this.phone;
  }

  set photo(photo) {
    this.photo = photo;
  }

  get photo() {
    return this.photo;
  }
}

export default User;
