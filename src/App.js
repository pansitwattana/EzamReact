import React from 'react';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import logo from './logo.svg';
import Paper from './components/Paper';
import Button from './components/commons/Button'
import './App.css';

const Page = ({ title }) =>
  (<div className="App">
    <div className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h2>
        {title}
      </h2>
    </div>
    <p className="App-intro">
      This is the {title} page.
    </p>
    <Link style={{ textDecoration: 'none' }} to="/paper">
      <Button>Paper</Button>
    </Link>
  </div>);

const Home = () => <Page title="Home" />;

const App = () => (
  <Router>
    <div>
      <Route exact path="/" component={Home} />
      <Route path="/paper" component={Paper} />
    </div>
  </Router>
);

export default App;
