import mutations from '@/store/mutations';

describe('manipulate product quntity and original counter', () => {
  let state;
  let productsFromApi;
  const originalCounter0 = 8;
  const originalCounter1 = 9;

  beforeEach(() => {
    productsFromApi = [{
      name: 'compuer',
      price: 80,
      quantity: 7,
      Currency: 'USD',
      originalCounter: originalCounter0,
    }, {
      name: 'compuer1',
      price: 80,
      quantity: 0,
      Currency: 'USD',
      originalCounter: originalCounter1,
    }];

    state = {
      productsFromApi,
    };
  });

  it('when clearCart is called then quantity is set to be original quantity got from server', () => {
    mutations.clearCart(state);
    expect(state.productsFromApi[0].quantity).toEqual(originalCounter0);
    expect(state.productsFromApi[1].quantity).toEqual(originalCounter1);
  });

  it('when tryDecreaseProductCounter is called and product counter > 0 then quantity is decreased by one', () => {
    const expectedQuantity = state.productsFromApi[0].quantity - 1;
    mutations.tryDecreaseProductCounter(state, productsFromApi[0].name);
    expect(state.productsFromApi[0].quantity).toEqual(expectedQuantity);
  });

  it('when tryDecreaseProductCounter is called and product counter = 0 then exception is thrown', () => {
    expect(() => mutations.tryDecreaseProductCounter(state, productsFromApi[1].name))
      .toThrow(Error);
  });
});

describe('manipulate product quntity and original counter', () => {
  let productsFromApi;
  const quantity0 = 8;
  const quantity1 = 9;
  const state = {
    count: 0,
    productsFromApi: [],
  };

  beforeEach(() => {
    productsFromApi = [{
      name: 'compuer',
      price: 80,
      quantity: quantity0,
      Currency: 'USD',
    }, {
      name: 'compuer1',
      price: 80,
      quantity: quantity1,
      Currency: 'USD',
    }];
  });

  it('when setProducts is called then original quantity is set to be quantity got from server', () => {
    mutations.setProducts(state, productsFromApi);
    expect(state.productsFromApi[0].quantity).toEqual(state.productsFromApi[0].originalCounter);
    expect(state.productsFromApi[1].quantity).toEqual(state.productsFromApi[1].originalCounter);
  });
});
