import axios from 'axios';

export default {
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
  coolFunction({ state, commit }) {
    axios.post('/Home/UpdateCart', state.productsFromApi)
      .then((result) => {
        commit('setProducts', result.data);
      })
      .catch(console.log);

    axios.get('/Home/GetProducts')
      .then((result) => {
        commit('setProducts', result.data);
      })
      .catch(console.log);
  },
};
