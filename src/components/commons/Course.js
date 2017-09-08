import React from 'react'
import { Card } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const CourseComponent = ({ title, subtitle, itemCount }) => (
  <Link style={{ width: '33%', textDecoration: 'none' }} to={`/catalog/${title}`} >
    <Card style={{ width: '95%', margin: '10px 10px 10px 10px' }}>
      <Card.Content>
        <Card.Header>{title}</Card.Header>
        <Card.Meta>
          <span className="date">Created in 2015</span>
        </Card.Meta>
        <Card.Description>
          {subtitle}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        {itemCount} Items
      </Card.Content>
    </Card>
  </Link>
)

CourseComponent.defaultProps = {
  title: 'Calculus',
  subtitle: 'learn about Differential and Intregration.',
  itemCount: 22,
}

CourseComponent.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  itemCount: PropTypes.number,
}

export default CourseComponent
