<template>
  <div>
    <h1>items in Cart</h1>
    <button @click="FlushCartToTheBackend()">lock products in cart</button>
    <prettyTable>
      <table>
        <tr>
          <th>Product Name</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Total price</th>
        </tr>
        <CartItem v-for="(product, index) in productsToShow" :key="index"
            :name="product.name"
            :price="product.price"
            :quantity="product.originalCounter - product.quantity"
            :Currency="product.Currency">
        </CartItem>
      </table>
    </prettyTable>
    <p>cart sum: {{CartPrice}}</p>
    <button @click="clearCart()">clear cart</button>
  </div>
</template>

<script>
import CartItem from './cartItem.vue';
import prettyTable from './prettyTable.vue';

export default {
  name: 'ShoppingCart',
  components: {
    CartItem,
    prettyTable,
  },
  computed: {
    productsToShow() {
      return this.$store.state.productsFromApi.filter((x) => x.originalCounter - x.quantity > 0);
    },
    CartPrice() {
      const productsInCart = this.$store
        .state
        .productsFromApi
        .filter((x) => x.originalCounter - x.quantity > 0);

      console.log(`${productsInCart}`);
      let cartSum = 0;
      productsInCart.forEach((x) => {
        cartSum += (x.originalCounter - x.quantity) * x.price;
      });

      return cartSum;
    },
  },
  methods: {
    FlushCartToTheBackend() {
      this.$store.dispatch('FlushCartToTheBackend');
    },
    clearCart() {
      this.$store.commit('clearCart');
    },
  },
};
</script>

<style scoped>
</style>
