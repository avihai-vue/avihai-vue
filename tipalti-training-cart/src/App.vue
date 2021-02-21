<template>
  <div id="app">
    <ul>
      <!-- <consider extract this to a component with slot> -->
        <router-link to="/productsPage">products  -- </router-link>
        <router-link to="/shoppingCart">shopping Cart  -- </router-link>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  created() {
    console.log('app created!');
    this.$store.dispatch('GetProductsFromApi');
  },
  name: 'App',
  components: {
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

<style scoped>
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

li {
  display: inline;
}
</style>
