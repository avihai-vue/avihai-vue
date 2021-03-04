import { mount, createLocalVue } from '@vue/test-utils';
import App from '@/App.vue';
import VueRouter from 'vue-router';
import productsPage from '@/components/productsPage.vue';
import shoppingCart from '@/components/shoppingCart.vue';
import routes from '@/router/routes';
import Vuex from 'vuex';

jest.mock('@/components/productsPage.vue', () => ({
  name: 'ProductsPage',
  render: (h) => h('div'),
}));

jest.mock('@/components/shoppingCart.vue', () => ({
  name: 'ShoppingCart',
  render: (h) => h('div'),
}));

const localVue = createLocalVue();
localVue.use(VueRouter);
localVue.use(Vuex);

describe('App', () => {
  let router;
  let wrapper;
  let store;
  let actions;

  function CreateMockedStore() {
    actions = {
      GetProductsFromApi: jest.fn(),
    };

    store = new Vuex.Store({
      actions,
      state: {
        productsFromApi: [],
      },
    });
  }
  beforeEach(() => {
    CreateMockedStore();
    router = new VueRouter({ routes, mode: 'abstract' });
    wrapper = mount(App, {
      localVue,
      router,
      store,
    });
  });

  it('renders productsPage when clicked on corresponding router-link', async () => {
    wrapper.find('.productsPageLink').trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.findComponent(productsPage).exists()).toBe(true);
  });

  it('renders shoppingCart when clicked on corresponding router-link', async () => {
    wrapper.find('.shoppingCartLink').trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.findComponent(shoppingCart).exists()).toBe(true);
  });

  it('when app.vue is created then GetProductsFromApi action is fired', async () => {
    expect(actions.GetProductsFromApi).toHaveBeenCalled();
  });
});
