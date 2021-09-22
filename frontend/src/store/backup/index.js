import { applyMiddleware, createStore, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers';
import Cryptr from 'cryptr';

const cryptr = new Cryptr('key');

let preloadedState;
const persistedTodosString = localStorage.getItem('new');

const saveLocal = ({getState}) => {
  return (next) => (action) => {
    const result = next(action);
    console.log('Middleware', action, getState());
    const encryptedString = cryptr.encrypt(JSON.stringify(getState()));
    localStorage.setItem('new', encryptedString);
    return result;
  };
}

if(persistedTodosString) {
  const decryptedString = cryptr.decrypt(persistedTodosString);
  preloadedState = JSON.parse(decryptedString)
}

//const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(rootReducer, preloadedState, composeWithDevTools(applyMiddleware(saveLocal, thunkMiddleware)));