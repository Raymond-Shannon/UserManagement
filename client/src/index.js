import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';
import store from './store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <GoogleOAuthProvider clientId="907552871530-ra1if9hnglttlb02jnjvht6df71e9kj2.apps.googleusercontent.com">

    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>,
    </React.StrictMode>

  </GoogleOAuthProvider>,
);

