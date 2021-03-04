export default {
  setProducts(state, products) {
    const productsWithOriginalCounter = products.map(
      (x) => ({ ...x, originalCounter: x.quantity }),
    );
    state.productsFromApi = productsWithOriginalCounter;
  },
  tryDecreaseProductCounter(state, productName) {
    const product = state.productsFromApi.find((x) => x.name === productName);
    if (product.quantity > 0) {
      product.quantity -= 1;
    } else {
      throw new Error(`tryDecreaseProductCounter - {productName: ${productName}, quantity: 0}`);
    }
  },
  clearCart(state) {
    state.productsFromApi.forEach((x) => {
      x.quantity = x.originalCounter;
    });
  },
};
