# store
'''
import { createStore, applyMiddleware } from 'redux';
import { combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import alert from './reducers';
// import setAuthToken from './utils/setAuthToken';

const initialState = {};

const middleware = [thunk];

const store = createStore(
  rootreducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)
'''