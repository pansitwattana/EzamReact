import React, { Component } from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import styled from 'styled-components'
// import firebase from 'firebase'
import Auth0Lock from 'auth0-lock';
import { Input, Button } from 'semantic-ui-react'
import { graphql, gql } from 'react-apollo';
import PropTypes from 'prop-types';
import Header from './commons/Header'
import Logo from './commons/Logo'

const Form = styled.div`
  display: flex;
  paddind: 10px 10px;
  justify-content: center;
  flex-direction: column;
`


class Login extends Component {
  static propTypes = {
    mutate: PropTypes.func.isRequired
  };

  state = {
    username: '',
    password: '',
  }

  lock = new Auth0Lock(
    'XbROZxuwYdEHTQaGNN5irLFDpR5JB6b3',
    'ezam.auth0.com',
    {
      auth: {
        responseType: 'id_token',
        params: {scope: 'openid email'}
      }
    }
  );

  onSubmit = () => {
    console.log(this.props)
    // firebase.auth().signInWithEmailAndPassword(this.state.username, this.state.password)
    //   .then(() => this.props.changePage({ username: this.state.username, email: this.state.user }, ''))
    //   .catch(error => alert(error.message))
  }

  componentDidMount() {
    this.lock.on('authenticated', authResult => {
      window.localStorage.setItem('auth0IdToken', authResult.idToken);
      console.log('authen done', authResult)
      const variables = {
        idToken: authResult.idToken,
        email: authResult.idTokenPayload.email
      }
      this.props.mutate({ variables })
        .then(res => {
          console.log(res)
          this.props.history.replace('/');
        })
        .catch(error => {
          console.error(error);
          this.props.history.replace('/');
        });
    });
  }

  login = () => {
    this.lock.show();
  };

  render() {
    return (
      <div>
        <Logo />
        <Header text="Login" />
        <Form>
          <Input icon="user" iconPosition="left" placeholder="Username" onChange={(e, username) => this.setState({ username: username.value })} />
          <Input
            icon="lock"
            type="password"
            iconPosition="left"
            placeholder="Password"
            onChange={(e, password) => this.setState({ password: password.value })}
          />
          <Button positive onClick={this.login}>Login</Button>
          <Button onClick={() => this.props.changePage(null, 'register')}>Sign Up</Button>
        </Form>
      </div>
    )
  }
}

const createUser = gql`
mutation($idToken: String!, $email: String!) {
  createUser(
    authProvider: { auth0: { idToken: $idToken } }
    email: $email
  ) {
    id
  }
}
`;

const userQuery = gql`
query {
  user {
    id
  }
}
`;

const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: (user, page) => push(`/${page}`, { data: user }),
}, dispatch)

export default connect(
  null,
  mapDispatchToProps,
)(graphql(createUser)(graphql(userQuery)(Login)))
