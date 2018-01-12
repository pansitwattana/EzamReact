import React, { Component } from 'react'
import { Card } from 'semantic-ui-react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import LaTexContainer from './LaTexContainer'

const Author = styled.div`
  font-size: 10px;
  color: grey;
`

const Status = styled.span`
  font-size: 15px;
  color: green;
`

class PostContainer extends Component {
  onClick(index, status) {
    // console.log(this.state.problems[index])
    const { id } = this.props.posts[index]
    if (status === 'Done') {
      this.props.history.push('/answer', { id })
    }
    else {
      this.props.history.push(`/paper/${id}`)
    }
  }

  getUserStatus(problem, user) {
    if (!user) {
      return false
    }

    let done = false

    // if (problem.author.id === user.id) {
    //   return 'Edit'
    // }

    problem.solutions.forEach((solution) => {
      if (solution.author.id === user.id) {
        done = 'Done'
      }
    })

    return done
  }

  render() {
    const { posts, user } = this.props
    return posts.map((problem, index) => {
      const status = this.getUserStatus(problem, user)
      const answerSpan = status ? <Status>{status}</Status> : <div />
      return (
        <Card
          key={problem.id}
          style={{ width: '95%' }}
          onClick={() => this.onClick(index, status)}
        >
          <Card.Content>
            <Card.Header
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <span>{problem.title}</span>
            </Card.Header>
            <Card.Meta
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <span>{problem.difficulty}</span>
              <Author>Posted by {problem.author.name}</Author>
            </Card.Meta>
            <Card.Description
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <LaTexContainer text={problem.latex} id={problem.id} />
              {answerSpan}
            </Card.Description>
          </Card.Content>
        </Card>
      )
    })
  }
}

PostContainer.propTypes = {
  posts: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
}

export default withRouter(PostContainer)
