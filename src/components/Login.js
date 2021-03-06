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

const Form = styled.div`
  display: flex;
  padding: 10px 10px;
  justify-content: center;
  flex-direction: column;
`

const LoginButton = styled(Button)`
  margin: 30px !important;
  padding: 20px;
`

class Login extends Component {
  static propTypes = {
    createUser: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
  };

  lock = new Auth0Lock(
    'XbROZxuwYdEHTQaGNN5irLFDpR5JB6b3',
    'ezam.auth0.com',
    {
      auth: {
        responseType: 'id_token',
        params: { scope: 'openid email' },
      },
    },
  );

  onSubmit = () => {
    console.log(this.props)
    // firebase.auth().signInWithEmailAndPassword(this.state.username, this.state.password)
    //   .then(() => this.props.changePage({ username: this.state.username, email: this.state.user }, ''))
    //   .catch(error => alert(error.message))
  }

  componentDidUpdate() {
    const { error, user } = this.props.data
    if (this.props.data.error) {
      console.log(error)
    }
    if (user) {
      // console.log(this.props.data)
      this.props.history.replace('/');
    }
  }

  componentDidMount() {
    // console.log(this.props)
    this.lock.on('authenticated', (authResult) => {
      window.localStorage.setItem('auth0IdToken', authResult.idToken);
      console.log('authen done', authResult)
      console.log(this.props)
      const email = authResult.idTokenPayload.email
      const variables = {
        idToken: authResult.idToken,
        email,
        name: email,
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
      // console.log(this.props.data)
      this.props.createUser({ variables })
        .then((res) => {
          console.log(res)
          this.props.data.refetch()
          // window.localStorage.setItem('id', res.)
          // this.props.history.replace('/');
        })
        .catch((error) => {
          console.error(error);
          this.props.data.refetch()
          // this.props.history.replace('/');
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
        <Form>
          <LoginButton positive onClick={this.login}>Login</LoginButton>
          <LoginButton onClick={this.login}>Register</LoginButton>
          {/* <Button onClick={() => this.props.changePage(null, 'register')}>Sign Up</Button> */}

        </Form>
      </div>
    )
  }
}

const createUser = gql`
mutation($idToken: String!, $email: String!, $name: String!) {
  createUser(
    authProvider: { auth0: { idToken: $idToken } }
    email: $email
    name: $name
    credit: 100
    experience: 0
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
export default graphql(createUser, { name: 'createUser' })(graphql(userQuery, { options: { fetchPolicy: 'network-only' } })(withRouter(Login)),)
