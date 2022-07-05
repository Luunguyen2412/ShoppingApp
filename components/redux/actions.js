export const INCREASE_COUNT = 'INCREASE_COUNT';
export const DECREASE_COUNT = 'DECREASE_COUNT';
export const COUNTING_PRICE = 'COUNTING_PRICE';
export const GET_CATEGORIES = 'GET_CATEGORIES';
export const GET_PRODUCTS = 'GET_PRODUCTS';

const API_URL =
  'https://raw.githubusercontent.com/tikivn/miniapp-getting-started/main/shop/src/services/mock/categories.json';

const BASE_URL =
  'https://raw.githubusercontent.com/tikivn/miniapp-getting-started/main/shop/src/services/mock';

export const request = async ({path, method = 'GET', headers = {}, data}) => {
  return new Promise((resolve, reject) => { // error in Promiss: check after
    my.request({
      URL: `${BASE_URL}/${path}.json`,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      method,
      data,
      success: res => {
        resolve(res);
      },
      fail: err => {
        reject(err);
      },
    });
  });
};

export const getProducts = () => {
  //return request({path: '/products'});
  try {
    return async dispatch => {
      const result = await fetch('https://raw.githubusercontent.com/tikivn/miniapp-getting-started/main/shop/src/services/mock/products.json', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const json = await result.json();
      if (json) {
        dispatch({
          type: GET_PRODUCTS,
          payload: json,
        });
      }
    };
  } catch (error) {
    console.log(error);
  }
};

export const getCategories = () => {
  try {
    return async dispatch => {
      const result = await fetch(API_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const json = await result.json();
      if (json) {
        dispatch({
          type: GET_CATEGORIES,
          payload: json,
        });
      }
    };
  } catch (error) {
    console.log(error);
  }
};

export const increaseCount = () => dispatch => {
  dispatch({type: INCREASE_COUNT});
};

export const decreaseCount = () => dispatch => {
  dispatch({type: DECREASE_COUNT});
};

export const countingPrice = () => dispatch => {
  dispatch({type: COUNTING_PRICE});
};
