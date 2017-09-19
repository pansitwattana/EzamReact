import React from 'react'
import { Route, BrowserRouter as Router } from 'react-router-dom'
import Paper from './components/Paper'
import Home from './components/Home'
import Catalog from './components/Catalog'
import Answer from './components/Answer'
import Profile from './components/Profile'
import Login from './components/Login'
import Register from './components/Register'
import Problem from './components/Problem'

const App = () => (
  <Router>
    <div>
      <Route exact path="/" component={Home} />
      <Route path="/paper" component={Paper} />
      <Route path="/catalog/:title" component={Catalog} />
      <Route path="/answer" component={Answer} />
      <Route path="/profile" component={Profile} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/problem" component={Problem} />
    </div>
  </Router>
);


export default App;
