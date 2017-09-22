import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'semantic-ui-react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import uuid from 'uuid'
import Header from './commons/Header'
import Search from './commons/Search'
import LaTex from './commons/LaTeX'

const Author = styled.div`
  font-size: 10px;
  color: grey;
`

const Catalog = props =>
  (<div>
    <Header text={'Calculus'} />
    <Search />
    <Card.Group style={{ display: 'flex', justifyContent: 'center', margin: 0 }}>
      <Link to="/paper" style={{ textDecoration: 'none', width: '95%' }}>
        <Card style={{ width: '100%' }}>
          <Card.Content>
            <Card.Header style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <span>Differential</span>
              <Author>Author by Karn</Author>
            </Card.Header>
            <Card.Meta>Easy</Card.Meta>
            <Card.Description><LaTex text="5x^2+7" id={uuid()} /></Card.Description>
          </Card.Content>
        </Card>
      </Link>
      <Link to="/paper" style={{ textDecoration: 'none', width: '95%' }}>
        <Card style={{ width: '100%' }}>
          <Card.Content>
            <Card.Header style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <span>Limit</span>
              <Author>Author by Kru Club</Author>
            </Card.Header>
            <Card.Meta>Easy</Card.Meta>
            <Card.Description><LaTex text="\lim_{x \to 2} f(x) = 5" id={uuid()} /></Card.Description>
          </Card.Content>
        </Card>
      </Link>
      <Link to="/paper" style={{ textDecoration: 'none', width: '95%' }}>
        <Card style={{ width: '100%' }}>
          <Card.Content>
            <Card.Header style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <span>Integreation</span>
              <Author>Author by JJ</Author>
            </Card.Header>
            <Card.Meta>Easy</Card.Meta>
            <Card.Description><LaTex text="\int_{3}^{5} x^2 dx" id={uuid()} /></Card.Description>
          </Card.Content>
        </Card>
      </Link>
      <Link to="/paper" style={{ textDecoration: 'none', width: '95%' }}>
        <Card style={{ width: '100%' }}>
          <Card.Content>
            <Card.Header style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <span>Differential</span>
              <Author>Author by The Brand</Author>
            </Card.Header>
            <Card.Meta>Easy</Card.Meta>
            <Card.Description><LaTex text="5x^2+7" id={uuid()} /></Card.Description>
          </Card.Content>
        </Card>
      </Link>
    </Card.Group>
  </div>)

Catalog.defaultProps = {
  title: 'Course',
}

Catalog.propTypes = {
  title: PropTypes.string,
}

export default Catalog
