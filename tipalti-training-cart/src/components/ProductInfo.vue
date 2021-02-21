<template>
  <div class="productContainer">
      <h1>product-name: {{name}}</h1>
      <p>product-price: {{price | currencySymbol(Currency)}}</p>
      <p>product-quantity: {{quantity}}</p>
      <button @click="productAddedToCart()" v-if="quantity > 0">add to cart</button>
  </div>
</template>

<script>
import productProps from '../product-props-mixin';

export default {
  name: 'ProductInfo',
  mixins: [productProps],
  methods: {
    productAddedToCart() {
      this.$emit('productAddedToCartEvent');
    },
  },
};
</script>

<style scoped>
</style>
