import Vue from 'vue';
import Router from 'vue-router';

import shoppingCart from '../components/shoppingCart.vue';
import productsPage from '../components/productsPage.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/productsPage',
      name: 'productsPage',
      component: productsPage,
    }, {
      path: '/shoppingCart',
      name: 'shoppingCart',
      component: shoppingCart,
    }],
});
