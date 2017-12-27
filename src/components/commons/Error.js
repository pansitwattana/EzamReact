import React from 'react'
import { Card } from 'semantic-ui-react'
import propTypes from 'prop-types'

const Error = ({ message }) => (
  <Card>
    <Card.Content>
      <Card.Header>{message}</Card.Header>
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
