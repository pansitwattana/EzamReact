import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'semantic-ui-react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Header from './commons/Header'

const Catalog = props =>
  (<Card.Group style={{ display: 'flex', justifyContent: 'center', margin: 0 }}>
    <Header text={props.title}/>
    <Link to="/paper" style={{ textDecoration: 'none', width: '95%' }}>
      <Card style={{ width: '100%' }}>
        <Card.Content>
          <Card.Header>Differential</Card.Header>
          <Card.Meta>Easy</Card.Meta>
          <Card.Description>5x^2+7</Card.Description>
        </Card.Content>
      </Card>
    </Link>
    <Link to="/paper" style={{ textDecoration: 'none', width: '95%' }}>
      <Card style={{ width: '100%' }}>
        <Card.Content>
          <Card.Header>Differential</Card.Header>
          <Card.Meta>Easy</Card.Meta>
          <Card.Description>5x^2+7</Card.Description>
        </Card.Content>
      </Card>
    </Link>
    <Link to="/paper" style={{ textDecoration: 'none', width: '95%' }}>
      <Card style={{ width: '100%' }}>
        <Card.Content>
          <Card.Header>Differential</Card.Header>
          <Card.Meta>Easy</Card.Meta>
          <Card.Description>5x^2+7</Card.Description>
        </Card.Content>
      </Card>
    </Link>
    <Link to="/paper" style={{ textDecoration: 'none', width: '95%' }}>
      <Card style={{ width: '100%' }}>
        <Card.Content>
          <Card.Header>Differential</Card.Header>
          <Card.Meta>Easy</Card.Meta>
          <Card.Description>5x^2+7</Card.Description>
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
