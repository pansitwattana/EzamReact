import React from 'react'
import { Route, BrowserRouter as Router } from 'react-router-dom'
import Paper from './components/Paper'
import Home from './components/Home'

const App = () => (
  <Router>
    <div>
      <Route exact path="/" component={Home} />
      <Route path="/paper" component={Paper} />
    </div>
  </Router>
);

export default App;
