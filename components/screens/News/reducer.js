//import {state as initialState} from './state';
import {GET_BUSINESS, GET_ENTERTAINMENT, getBusiness} from './action';

const initialState = {
  business: [],
  entertainment: [],
};

const newsReducer = (state = initialState, action) => {
  switch (action.type) {
    case getBusiness:
      return {...state, business: action.data};
    case GET_ENTERTAINMENT:
      return {...state, entertainment: action.payload};
    default:
      return state;
  }
};

export {newsReducer};
