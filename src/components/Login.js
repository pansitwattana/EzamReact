import React from 'react'
import styled from 'styled-components'
import { Input, Button } from 'semantic-ui-react'
import Header from './commons/Header'

const Form = styled.div`
  display: flex;
  paddind: 10px 10px;
  justify-content: center;
  flex-direction: column;
`

const Login = () => (
  <div>
    <Header text="Login" />
    <Form>
      <Input icon="user" iconPosition="left" placeholder="Username" />
      <Input icon="lock" type="password" iconPosition="left" placeholder="Password" />
      <Button positive>Login</Button>
    </Form>
  </div>
)

export default Login
