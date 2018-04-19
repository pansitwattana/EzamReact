import React from 'react'
import { Card, Button } from 'semantic-ui-react'
import propTypes from 'prop-types'
import styled from 'styled-components'

const LoginButton = styled(Button)`
  margin: 30px !important;
  padding: 20px;
`

const Error = ({ message, login, onLoginClick }) => (
  <Card style={{ width: '96%', margin: '2%' }}>
    <Card.Content>
      <Card.Header>
        {message}
        {login && <LoginButton positive onClick={onLoginClick}>Login</LoginButton>}
      </Card.Header>
    </Card.Content>
  </Card>
)

Error.defaultProps = {
  message: 'Error',
}

Error.propTypes = {
  message: propTypes.string,
}

export default Error
