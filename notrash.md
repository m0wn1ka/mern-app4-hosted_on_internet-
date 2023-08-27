git init
git ignore
npm init
npm install express bcryptjs etc
open entry point file(index js)
for sending post request in postman u need to set content type header
const {check,validationResult}=require('express-validator');
==========================
npx create-react-app client
npm install axios react-router-dom redux react-redux thunk
in package.json of frontend(
    },"proxy":http://localhost:5000"
)
==============
# error
(register:1 Access to XMLHttpRequest at 'http://localhost:3001/api/users' from origin 'http://localhost:3000' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource.)
## solution
const express = require('express');
const cors = require('cors');
const app = express();

// Enable CORS for all routes
app.use(cors());
===================
in folder actions/src/frontend create types file and write
'''
 export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAIL = 'REGISTER_FAIL';
'''
### reducers
in folder reducers/src/frontend create auth.js ,import types of action,define the initinal state 
'''
const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null
};
'''
write a function with params (initialstate,action type)
use a switch or something to perform relevant state change
'''
   case REGISTER_SUCCESS:
      case LOGIN_SUCCESS:
        localStorage.setItem('token',payload.token);
        return {
          ...state,
          ...payload,
          isAuthenticated: true,
          loading: false
        };
        '''
### actions         
in folder actions/src/frontend create auth.js file for performing backend request and dispatc relevent action based on responses
so import the types of actions from types.js
write function with params for post request inputs ,dispatch 
then write relevant headers
send axios request
based on response dispatch actions with relevant inputs
### from compontent calling acionts
in register component call this register function of actions file with relevant inputs
while defining register component input the register action ........
### root reducer
create a file index.js which acts as root reducer in reducers folder
'''
//root reducer which is used in store.j
import { combineReducers } from "redux";
import auth from './auth';

export default combineReducers({
  auth
});
'''
### setauth token 
in a file write setauth token function
'''
// import api from './api';
import axios from 'axios';
// store our JWT in LS and set axios headers if we do have a token

const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
    // localStorage.setItem('token', token);
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
    // localStorage.removeItem('token');
  }
};

export default setAuthToken;
'''
### provider ={store}
'''
<Provider store={store}></Provider>
'''

## store 
create a file called store inside src folder
'''
import { createStore, applyMiddleware } from 'redux';
import { combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
// import setAuthToken from './utils/setAuthToken';

const initialState = {};

const middleware = [thunk];

const store = createStore(
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);


export default store;
'''