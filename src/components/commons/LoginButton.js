import React from 'react'
import { Button } from 'semantic-ui-react'
import propTypes from 'prop-types'

const LoginButton = ({ onClick }) => (
  <Button onClick={onClick} color="teal" size="large">Login</Button>
)

LoginButton.propTypes = {
  onClick: propTypes.func.isRequired,
}

export default LoginButton
