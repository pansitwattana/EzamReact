import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase'
import 'semantic-ui-css/semantic.min.css';
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

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
