<template>
  <div id="products">
    <ul>
      <li v-for="(product, index) in productsToShow" :key="index">
        <productInfo
            :name="product.name"
            :price="product.price"
            :quantity="product.quantity"
            :Currency="product.Currency"
            @productAddedToCartEvent="() => updaeProductCounter(productsToShow[index])">
        </productInfo>
      </li>
    </ul>
  </div>
</template>

<script>
import productInfo from './ProductInfo.vue';

export default {
  name: 'productsPage',
  components: {
    productInfo,
  },
  computed: {
    productsToShow() {
      return this.$store.state.productsFromApi;
    },
  },
  methods: {
    updaeProductCounter(product) {
      if (product.quantity > 0) {
        this.$store.commit('tryDecreaseProductCounter', product.name);
      } else {
        // change to alert the user can see.
        console.log('do not hvae any more products..');
      }
    },
  },
};
</script>

<style>
#products {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
