import React, { Component } from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import styled from 'styled-components'
// import firebase from 'firebase'
import { Input, Button } from 'semantic-ui-react'
import Header from './commons/Header'
import Logo from './commons/Logo'

const Form = styled.div`
  display: flex;
  paddind: 10px 10px;
  justify-content: center;
  flex-direction: column;
`

class Login extends Component {
  state = {
    username: '',
    password: '',
  }

  onSubmit = () => {
    console.log(this.props)
    // firebase.auth().signInWithEmailAndPassword(this.state.username, this.state.password)
    //   .then(() => this.props.changePage({ username: this.state.username, email: this.state.user }, ''))
    //   .catch(error => alert(error.message))
  }

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
          <Button positive onClick={this.onSubmit}>Login</Button>
          <Button onClick={() => this.props.changePage(null, 'register')}>Sign Up</Button>
        </Form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: (user, page) => push(`/${page}`, { data: user }),
}, dispatch)

export default connect(
  null,
  mapDispatchToProps,
)(Login)
