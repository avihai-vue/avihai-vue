import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import productsPage from '@/components/productsPage.vue';

const localVue = createLocalVue();

localVue.use(Vuex);
function CreateProductsFromApi() {
  return [{
    name: 'computer0',
    price: 80,
    quantity: 7,
    Currency: 'USD',
  }, {
    name: 'computer1',
    price: 81,
    quantity: 8,
    Currency: 'EUR',
  }];
}

describe('productsPage.vue', () => {
  let wrapper;
  let components;
  let mutations;
  let store;
  let productsFromApi;

  function assertChildPropertyMatchArrayProperty(index, property) {
    expect(components.wrappers[index].props()[property]).toBe(productsFromApi[index][property]);
  }

  function CreateMockedStore() {
    mutations = {
      tryDecreaseProductCounter: jest.fn(),
    };

    store = new Vuex.Store({
      mutations,
      state: {
        productsFromApi,
      },
    });
  }

  beforeEach(() => {
    productsFromApi = CreateProductsFromApi();
    CreateMockedStore();
    wrapper = shallowMount(productsPage, { store, localVue });
    components = wrapper.findAllComponents({ name: 'ProductInfo' });
  });

  it('when store contain productsFromApi then it v-for renders them correctly', () => {
    let index; let property;
    assertChildPropertyMatchArrayProperty(index = 0, property = 'name');
    assertChildPropertyMatchArrayProperty(index = 0, property = 'price');
    assertChildPropertyMatchArrayProperty(index = 0, property = 'quantity');
    assertChildPropertyMatchArrayProperty(index = 0, property = 'Currency');

    assertChildPropertyMatchArrayProperty(index = 1, property = 'name');
    assertChildPropertyMatchArrayProperty(index = 1, property = 'price');
    assertChildPropertyMatchArrayProperty(index = 1, property = 'quantity');
    assertChildPropertyMatchArrayProperty(index = 1, property = 'Currency');

    expect(components.wrappers.length).toBe(2);
  });

  it('when ProductInfo with quantity > 0 emitted productAddedToCartEvent then mutation is executed correctly', async () => {
    const secondProductInfo = 1;
    components.wrappers[secondProductInfo].vm.$emit('productAddedToCartEvent');
    await wrapper.vm.$nextTick();

    const productNamePassedToMutation = mutations.tryDecreaseProductCounter.mock.calls[0][1];
    const expectedProductName = components.wrappers[secondProductInfo].props().name;
    expect(productNamePassedToMutation).toBe(expectedProductName);
  });

  it('when ProductInfo with quantity = 0 emitted productAddedToCartEvent then mutation is not called', async () => {
    const secondProductInfo = 1;
    productsFromApi[secondProductInfo].quantity = 0;
    components.wrappers[secondProductInfo].vm.$emit('productAddedToCartEvent');
    await wrapper.vm.$nextTick();
    expect(mutations.tryDecreaseProductCounter).not.toHaveBeenCalled();
  });
});
