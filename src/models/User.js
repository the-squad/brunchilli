import Cookies from 'js-cookie';

let instance = null;
const USER_ID = 'USER_ID';

class User {
  constructor() {
    if (!instance) {
      instance = this;
    }
    return instance;
  }

  setUser = ({ id, name, phone, email, photo, address, isAdmin }) => {
    this.id = id;
    this.name = name;
    this.phone = phone;
    this.email = email;
    this.photo = photo;
    this.address = address;
    this.isAdmin = isAdmin;

    Cookies.set(USER_ID, this.id);
  };

  logOut = () => {
    Cookies.remove(USER_ID);
    window.location.reload();
  };

  getUser = () => ({
    id: this.id,
    name: this.name,
    photo: this.photo,
    email: this.email,
    phone: this.phone,
    address: this.address,
    isAdmin: this.isAdmin,
  });

  isUserExists = () => !!this.id || !!Cookies.get(USER_ID);

  isUserAdmin = () => this.isAdmin;

  getUserId = () => this.id || Cookies.get(USER_ID);
}

export default User;
