import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    count: 0,
    productsFromApi: [],
  },
  mutations: {
    setProducts(state, products) {
      const productsWithOriginalCounter = products.map(
        (x) => ({ ...x, originalCounter: x.quantity }),
      );
      state.productsFromApi = productsWithOriginalCounter;
    },
    tryDecreaseProductCounter(state, productName) {
      const product = state.productsFromApi.find((x) => x.name === productName);
      product.quantity -= 1;
    },
    clearCart(state) {
      state.productsFromApi.forEach((x) => {
        x.quantity = x.originalCounter;
      });
    },
  },
  actions: {
    GetProductsFromApi({ commit }) {
      axios.get('/Home/GetProducts')
        .then((result) => {
          commit('setProducts', result.data);
        })
        .catch(console.log);
    },
    FlushCartToTheBackend({ state, commit }) {
      axios.post('/Home/UpdateCart', state.productsFromApi)
        .then((result) => {
          commit('setProducts', result.data);
        })
        .catch(console.log);
    },
  },
});
