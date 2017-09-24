import React from 'react';
import { render } from 'react-dom';
import firebase from 'firebase'
import 'semantic-ui-css/semantic.min.css';
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import store, { history } from './store'
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const config = {
  apiKey: 'AIzaSyAtau_ldYK1E4al5ljsTxtVw4Gfdnajk_I',
  authDomain: 'ezam-51dcc.firebaseapp.com',
  databaseURL: 'https://ezam-51dcc.firebaseio.com',
  projectId: 'ezam-51dcc',
  storageBucket: 'ezam-51dcc.appspot.com',
  messagingSenderId: '448662049456',
};
firebase.initializeApp(config)

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.querySelector('#root'),
)

registerServiceWorker();
