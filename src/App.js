import React from 'react'
import { Route, BrowserRouter as Router } from 'react-router-dom'
import Paper from './components/Paper'
import Home from './components/Home'
import Catalog from './components/Catalog'
import Answer from './components/Answer'

const App = () => (
  <Router>
    <div>
      <Route exact path="/" component={Home} />
      <Route path="/paper" component={Paper} />
      <Route path="/catalog/:title" component={Catalog} />
      <Route path="/answer/:id" component={Answer} />
    </div>
  </Router>
);


export default App;
