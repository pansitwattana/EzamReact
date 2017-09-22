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

const Register = () => (
  <div>
    <Logo />
    <Header text="Register" />
    <Form>
      <Input icon="user" iconPosition="left" placeholder="Username" />
      <Input icon="mail" iconPosition="left" placeholder="abc@gmail.com" />
      <Input icon="lock" type="password" iconPosition="left" placeholder="Password" />
      <Input icon="lock" type="password" iconPosition="left" placeholder="Confirm Password" />
      <Button positive>Login</Button>
    </Form>
  </div>
)

export default Register
