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

  setUser = ({ id, name, phone, email, photo, address }) => {
    this.id = id;
    this.name = name;
    this.phone = phone;
    this.email = email;
    this.photo = photo;
    this.address = address;

    Cookies.set(USER_ID, this.id);
  };

  isUserExists = () => !!this.userId || Cookies.get(USER_ID);

  getUserId = () => this.id;
}

export default User;
