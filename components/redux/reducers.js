import {
  INCREASE_COUNT,
  DECREASE_COUNT,
  COUNTING_PRICE,
  GET_CATEGORIES,
} from './actions';

const initialState = {
  count: 1,
  price: 0,
  categories: [],
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case INCREASE_COUNT:
      return {...state, count: state.count + 1};
    case DECREASE_COUNT:
      return {...state, count: state.count - 1};
    case COUNTING_PRICE:
      return {...state, price: state.price * state.count};
    case GET_CATEGORIES:
      return {...state, categories: action.payload};
    default:
      return state;
  }
}

export default userReducer;
