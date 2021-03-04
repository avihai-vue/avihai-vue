import shoppingCart from '../components/shoppingCart.vue';
import productsPage from '../components/productsPage.vue';

export default [
  {
    path: '/productsPage',
    name: 'productsPage',
    component: productsPage,
  }, {
    path: '/shoppingCart',
    name: 'shoppingCart',
    component: shoppingCart,
  },
];
