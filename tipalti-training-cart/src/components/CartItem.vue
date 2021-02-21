<template>
  <tr>
    <td>{{name}}</td>
    <td>{{price | currencySymbol(Currency)}}</td>
    <td>{{quantity}}</td>
    <td>{{(quantity * price) | currencySymbol(Currency)}}</td>
  </tr>
</template>

<script>
import productProps from '../product-props-mixin';

export default {
  name: 'CartItem',
  mixins: [productProps],
};
</script>

<style scoped>
</style>
