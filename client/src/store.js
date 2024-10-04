import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';  // Import redux-thunk middleware
import rootReducer from './reducers'; // Your root reducer
import { composeWithDevTools } from '@redux-devtools/extension';

// Create the Redux store, apply thunk middleware
const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk),
    // other store enhancers if any
  ),
);

export default store;