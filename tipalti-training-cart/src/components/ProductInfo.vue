<template>
  <div class="productContainer">
      <h1 class='product-name'>product-name: {{name}}</h1>
      <p class='product-price'>product-price: {{$filters.currencySymbol(price, Currency)}}</p>
      <p class='product-quantity'>product-quantity: {{quantity}}</p>
      <button class='product-button'
              @click="productAddedToCart()"
              v-if="quantity > 0">add to cart
      </button>
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
