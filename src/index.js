import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

if (module.hot) {
  // Whenever a new version of App.js is available
  module.hot.accept('./App', function () {
    // Require the new version and render it instead
    var App = require('./App')
    ReactDOM.render(<App />, 'root')
  })
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
