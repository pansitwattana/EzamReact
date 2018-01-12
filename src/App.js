import React from 'react'
import { Route, withRouter } from 'react-router-dom'
import { TransitionGroup } from 'react-transition-group'
// import { graphql, gql } from 'react-apollo'
import Paper from './components/Paper'
import Home from './components/Home'
import Catalog from './components/Catalog'
import Answer from './components/Answer'
import Profile from './components/Profile'
import Login from './components/Login'
import MyPosts from './components/MyPosts'
import CreateUser from './components/CreateUser'
import Register from './components/Register'
import Problem from './components/Problem'

const App = () => (
  <TransitionGroup style={{ height: '100%' }}>
    <Route exact path="/" component={Home} />
    <Route path="/paper/:id" component={Paper} />
    <Route path="/catalog/:title" component={Catalog} />
    <Route path="/answer" component={Answer} />
    <Route path="/profile" component={Profile} />
    <Route path="/login" component={Login} />
    <Route path="/posts" component={MyPosts} />
    <Route path="/create" component={CreateUser} />
    <Route path="/register" render={() => <Register data={'test'} />} />
    <Route path="/post" component={Problem} />
  </TransitionGroup>
);

export default withRouter(App)
