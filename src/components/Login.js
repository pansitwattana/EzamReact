import React, { Component } from 'react'
// import { push } from 'react-router-redux'
import { withRouter } from 'react-router-dom'
// import { bindActionCreators } from 'redux'
// import { connect } from 'react-redux'
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
    createUser: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
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

  componentWillUpdate() {
    if (this.props.data.user || window.localStorage.getItem('auth0IdToken') !== null) {
      // console.log(this.props.data)
      this.props.history.replace('/');
    }
  }

  componentDidMount() {
    console.log(this.props)
    this.lock.on('authenticated', authResult => {
      window.localStorage.setItem('auth0IdToken', authResult.idToken);
      console.log('authen done', authResult)
      console.log(this.props)
      const variables = {
        idToken: authResult.idToken,
        email: authResult.idTokenPayload.email
      }
      // const queryVar = {
      //   auth0UserId: authResult.idTokenPayload.sub,
      // }
      // console.log(this.props.data.user)
      // this.props.query({ queryVar })
      //   .then(res => {
      //     console.log(res)
      //   })
      //   .catch(error => {
      //     console.error(error)
      //   })

      this.props.createUser({ variables })
        .then(res => {
          console.log(res)
          // window.localStorage.setItem('id', res.)
          // this.props.history.replace('/');
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
    if (this.props.data.loading) {
      return (<div>Loading</div>)
    }
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
          {/* <Button onClick={() => this.props.changePage(null, 'register')}>Sign Up</Button> */}
          
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
`

// const mapDispatchToProps = dispatch => bindActionCreators({
//   changePage: (user, page) => push(`/${page}`, { data: user }),
// }, dispatch)

// export default connect(
//   null,
//   mapDispatchToProps,
// )(graphql(createUser)(graphql(userQuery)(Login)))
export default graphql(createUser, {name: 'createUser'})(
  graphql(userQuery, { options: { fetchPolicy: 'network-only' }})(withRouter(Login))
)
