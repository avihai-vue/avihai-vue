<template>
  <tr>
    <td>{{name}}</td>
    <td>{{$filters.currencySymbol(price, Currency)}}</td>
    <td>{{quantity}}</td>
    <td>{{$filters.currencySymbol(quantity * price, Currency)}}</td>
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
