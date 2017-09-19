import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import uuid from 'uuid'
import Header from './commons/Header'
import LaTex from './commons/LaTeX'

const Catalog = props =>
  (<Card.Group style={{ display: 'flex', justifyContent: 'center', margin: 0 }}>
    <Header text={props.title}/>
    <Link to="/paper" style={{ textDecoration: 'none', width: '95%' }}>
      <Card style={{ width: '100%' }}>
        <Card.Content>
          <Card.Header>Differential</Card.Header>
          <Card.Meta>Easy</Card.Meta>
          <Card.Description><LaTex text="5x^2+7" id={uuid()} /></Card.Description>
        </Card.Content>
      </Card>
    </Link>
    <Link to="/paper" style={{ textDecoration: 'none', width: '95%' }}>
      <Card style={{ width: '100%' }}>
        <Card.Content>
          <Card.Header>Limit</Card.Header>
          <Card.Meta>Easy</Card.Meta>
          <Card.Description><LaTex text="\lim_{x \to 2} f(x) = 5" id={uuid()} /></Card.Description>
        </Card.Content>
      </Card>
    </Link>
    <Link to="/paper" style={{ textDecoration: 'none', width: '95%' }}>
      <Card style={{ width: '100%' }}>
        <Card.Content>
          <Card.Header>Intregration</Card.Header>
          <Card.Meta>Easy</Card.Meta>
          <Card.Description><LaTex text="\int_{3}^{5} x^2 dx" id={uuid()} /></Card.Description>
        </Card.Content>
      </Card>
    </Link>
    <Link to="/paper" style={{ textDecoration: 'none', width: '95%' }}>
      <Card style={{ width: '100%' }}>
        <Card.Content>
          <Card.Header>Differential</Card.Header>
          <Card.Meta>Easy</Card.Meta>
          <Card.Description><LaTex text="5x^2+7" id={uuid()}   /></Card.Description>
        </Card.Content>
      </Card>
    </Link>
  </Card.Group>)

Catalog.defaultProps = {
  title: 'Course',
}

Catalog.propTypes = {
  title: PropTypes.string,
}

export default Catalog
