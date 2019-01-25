import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducer from './reducer';

const store = createStore(
  reducer,
  applyMiddleware(thunk)
);

window.onbeforeunload = () => {
  window.localStorage.setItem('reduxState', JSON.stringify(store.getState()));
};

export default store;
