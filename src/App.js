import React from 'react'
import { Route } from 'react-router-dom'
import { TransitionGroup } from 'react-transition-group'
import Paper from './components/Paper'
import Home from './components/Home'
import Catalog from './components/Catalog'
import Answer from './components/Answer'
import Profile from './components/Profile'
import Login from './components/Login'
import Register from './components/Register'
import Problem from './components/Problem'

const App = () => (
  <TransitionGroup>
    <Route exact path="/" component={Home} />
    <Route path="/paper" component={Paper} />
    <Route path="/catalog/:title" component={Catalog} />
    <Route path="/answer" component={Answer} />
    <Route path="/profile" component={Profile} />
    <Route path="/login" component={Login} />
    <Route path="/register" render={() => <Register data={'test'} />} />
    <Route path="/problem" component={Problem} />
  </TransitionGroup>
);


export default App;
