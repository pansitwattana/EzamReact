import React, { Component } from 'react'
import styled from 'styled-components'
import firebase from 'firebase'
import { withRouter } from 'react-router-dom'
import { Input, Button } from 'semantic-ui-react'
import Header from './commons/Header'
import Logo from './commons/Logo'

const Form = styled.div`
  display: flex;
  paddind: 10px 10px;
  justify-content: center;
  flex-direction: column;
`

class Register extends Component {
  state = {
    username: '',
    mail: '',
    password: '',
    comfirmPassword: '',
  }

  onSubmit = () => {
    firebase.auth().createUserWithEmailAndPassword(this.state.mail, this.state.password)
      .then(response => this.props.history.push('/'))
      .catch(error => alert(error.message))
  }

  render() {
    return (
      <div>
        <Logo />
        <Header text="Register" />
        <Form>
          <Input icon="user" iconPosition="left" placeholder="Username" onChange={(event, username) => this.setState({ username: username.value })} />
          <Input icon="mail" iconPosition="left" placeholder="abc@gmail.com" onChange={(event, mail) => this.setState({ mail: mail.value })} />
          <Input icon="lock" type="password" iconPosition="left" placeholder="Password" onChange={(event, password) => this.setState({ password: password.value })} />
          <Input icon="lock" type="password" iconPosition="left" placeholder="Confirm Password" onChange={(event, password) => this.setState({ comfirmPassword: password.value })} />
          <Button positive onClick={this.onSubmit}>Register</Button>
        </Form>
      </div>
    )
  }
}

export default withRouter(Register)
