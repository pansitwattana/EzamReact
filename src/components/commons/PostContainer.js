import React, { Component } from 'react'
import { Card } from 'semantic-ui-react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import LaTexContainer from './LaTexContainer'
import Label from '../commons/CornerLabel'

const Author = styled.div`
  font-size: 10px;
  color: grey;
`

const Status = styled.span`
  font-size: 15px;
  color: green;
`

const SolveCount = styled.div`
  padding: 10px;
  border: solid #DADADB;
  border-width: 1px 1px;
  border-radius: 5px;
`

const Solve = styled.span`
  font-size: 16px;
  font-weight: bold;
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

  getUserStatus(solutions, user) {
    if (!user) {
      return false
    }

    let done = false

    // if (problem.author.id === user.id) {
    //   return 'Edit'
    // }

    solutions.forEach((solution) => {
      if (solution.author.id === user.id) {
        done = 'Done'
      }
    })

    return done
  }

  render() {
    const { posts, user } = this.props
    return posts.map((post, index) => {
      const { solutions, author, latex, id, difficulty, title } = post
      const solveCount = solutions.length
      const hasOwnerSolution = solutions.filter(solution => solution.author.id === author.id).length > 0
      const status = this.getUserStatus(solutions, user)
      const done = status === 'Done'
      const opacity = done ? 0.5 : 1
      return (
        <Card
          key={id}
          style={{ width: '95%', opacity }}
          onClick={() => this.onClick(index, status)}
        >
          <Card.Content>
          <Label text='Done' show={done} />
            <Card.Header
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <span>{title}</span>
            </Card.Header>
            <Card.Meta
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <span>{difficulty}</span>
              <div>
                <SolveCount><Solve>{solveCount}</Solve> SOLVES</SolveCount>
                {hasOwnerSolution ? <Status>Answered</Status> : undefined}
                <Author>Posted by {author.name}</Author>
              </div>
            </Card.Meta>
            <Card.Description
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <LaTexContainer text={latex || ''} id={id} />
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
