import React from 'react'
import { Button } from 'semantic-ui-react'

const LoginButton = ({ onClick }) => (
  <Button onClick={onClick} color='teal' size='large'>Login</Button>
)

export default LoginButton