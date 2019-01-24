import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducer from './reducer';
import { login } from './actions';

const store = createStore(
  reducer,
  applyMiddleware(thunk)
);

if (window.localStorage.getItem('gloAccessToken')) {
  store.dispatch(login(window.localStorage.getItem('gloAccessToken')));
}

export default store;
