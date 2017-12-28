import React from 'react';
import { render } from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import { ApolloProvider, ApolloClient, createNetworkInterface } from 'react-apollo';
import store, { history } from './store'
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const networkInterface = createNetworkInterface({
  uri: 'https://api.graph.cool/simple/v1/cj8xys6y80cqz0169yu1nn3ql',
});

networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {}
    }

    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('auth0IdToken')
    if (token) {
      req.options.headers.authorization = `Bearer ${token}`
    }
    next()
  },
}])

const client = new ApolloClient({
  networkInterface,
});

render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>
  </ApolloProvider>,
  document.querySelector('#root'),
)

registerServiceWorker();
