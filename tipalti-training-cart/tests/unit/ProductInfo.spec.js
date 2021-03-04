import { shallowMount } from '@vue/test-utils';
import ProductInfo from '@/components/ProductInfo.vue';
import Vue from 'vue';

describe('ProductInfo.vue', () => {
  const name = 'computer';
  const price = 80;
  const quantity = 3;
  const Currency = 'USD';

  const wrapper = shallowMount(ProductInfo, {
    propsData: {
      name, price, quantity, Currency,
    },
    mocks: {
      $filters: {
        currencySymbol: jest.fn((amount, currency) => `mock filter: ${amount}${currency}`),
      },
    },
  });

  function assertItemText(classIdentifier, expectedText) {
    expect(wrapper.find(`.${classIdentifier}`).text()).toBe(expectedText);
  }

  it('renders props.name when passed', () => {
    assertItemText('product-name', `product-name: ${name}`);
  });

  it('renders props.price when passed', () => {
    assertItemText('product-price', `product-price: mock filter: ${price}${Currency}`);
    expect(wrapper.vm.$filters.currencySymbol).toHaveBeenCalled();
  });

  it('renders props.quantity when passed', () => {
    assertItemText('product-quantity', `product-quantity: ${quantity}`);
  });

  it('when addToCart button is clicked then event is emitted', async () => {
    wrapper.find('.product-button').trigger('click');
    await Vue.nextTick();
    expect(wrapper.emitted().productAddedToCartEvent.length).toBe(1);
  });

  it('when props.quantity is 0 then the button is not in the DOM', async () => {
    expect(wrapper.find('.product-button').exists()).toBeTruthy();
    wrapper.setProps({ quantity: 0 });
    await Vue.nextTick();
    expect(wrapper.find('.product-button').exists()).toBeFalsy();
  });
});
