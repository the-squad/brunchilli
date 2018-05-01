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

  getCartTotal = () => {
    let total = 0;
    const itemsArray = Array.from(this.cart.values());
    itemsArray.forEach(item => {
      const itemTotal = item.count * item.price;
      total += itemTotal;
    });
    total = parseFloat(total);

    return total.toFixed(2);
  };

  clear = () => {
    this.cart = new Map();
  };

  isNotEmpty = () => this.cart.size() !== 0;
}

export default Cart;
