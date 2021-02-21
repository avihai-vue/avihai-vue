import Vue from 'vue';
import axios from 'axios';
import router from './router';
import App from './App.vue';
import store from './store';

import currencySymbolFilter from './shared/currency-filter';

Vue.config.productionTip = false;
Vue.prototype.$http = axios;

Vue.use(router);
Vue.filter('currencySymbol', currencySymbolFilter);

new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount('#app');
