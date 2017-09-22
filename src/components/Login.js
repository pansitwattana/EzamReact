import React from 'react'
import styled from 'styled-components'
import { Input, Button } from 'semantic-ui-react'
import Header from './commons/Header'
import Logo from './commons/Logo'

const Form = styled.div`
  display: flex;
  paddind: 10px 10px;
  justify-content: center;
  flex-direction: column;
`

const Login = () => (
  <div>
    <Logo />
    <Header text="Login" />
    <Form>
      <Input icon="user" iconPosition="left" placeholder="Username" />
      <Input icon="lock" type="password" iconPosition="left" placeholder="Password" />
      <Button positive>Login</Button>
      <Button>Sign Up</Button>
    </Form>
  </div>
)

export default Login
