import React from 'react'
import { Card } from 'semantic-ui-react'

const Error = ({ message }) => (
  <Card>
    <Card.Content>
      <Card.Header>{message}</Card.Header>
    </Card.Content>
  </Card>
)

export default Error
