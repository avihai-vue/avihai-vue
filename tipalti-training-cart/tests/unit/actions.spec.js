import actions from '@/store/actions';
import axios from 'axios';

describe('actions', () => {
  let commit;
  let state;
  const productsFromApi = [{ name: 'computer' }];
  beforeEach(() => {
    commit = jest.fn();
    state = { productsFromApi };
  });
  it('when GetProductsFromApi call is successful then setProducts mutation is performed with the result data', async () => {
    axios.get = jest.fn(() => Promise.resolve({ data: productsFromApi }));

    await actions.GetProductsFromApi({ commit });

    expect(axios.get).toHaveBeenCalledWith('/Home/GetProducts');
    expect(commit).toHaveBeenCalledWith('setProducts', productsFromApi);
  });

  it('when GetProductsFromApi call is failed then setProducts mutation is not called', async () => {
    axios.get = jest.fn(() => Promise.reject());

    await actions.GetProductsFromApi({ commit });

    expect(axios.get).toHaveBeenCalledWith('/Home/GetProducts');
    expect(commit).not.toHaveBeenCalled();
  });

  it('when FlushCartToTheBackend call is successful then setProducts mutation is performed with the result data', async () => {
    axios.post = jest.fn((url, data) => Promise.resolve({ data: productsFromApi }));

    await actions.FlushCartToTheBackend({ state, commit }, productsFromApi);

    expect(axios.post).toHaveBeenCalledWith('/Home/UpdateCart', productsFromApi);
    expect(commit).toHaveBeenCalledWith('setProducts', productsFromApi);
  });

  it('when FlushCartToTheBackend call is failed then setProducts mutation is not called', async () => {
    axios.post = jest.fn((url, data) => Promise.reject());

    await actions.FlushCartToTheBackend({ state, commit }, productsFromApi);

    expect(axios.post).toHaveBeenCalledWith('/Home/UpdateCart', productsFromApi);
    expect(commit).not.toHaveBeenCalled();
  });
});
