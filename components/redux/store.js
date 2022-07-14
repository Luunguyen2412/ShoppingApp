import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import userReducer from './reducers';
import {newsReducer} from '../screens/News/reducer';

const rootReducer = combineReducers({userReducer, newsReducer});

export const Store = createStore(rootReducer, applyMiddleware(thunk));
