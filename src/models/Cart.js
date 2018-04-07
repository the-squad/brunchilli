let instance = null;

class Cart {
  constructor() {
    if (!instance) {
      instance = this;
    }
    this.cart = new Map();
    return instance;
  }

  setCart = cart => {
    this.cart = cart;
  };

  getCart = () => this.cart;

  isNotEmpty = () => this.cart.size() !== 0;
}

export default Cart;
