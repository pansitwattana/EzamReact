import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
// import { push } from 'react-router-redux'
// import { bindActionCreators } from 'redux'
// import { connect } from 'react-redux'
import { gql, graphql } from 'react-apollo'
import { Card } from 'semantic-ui-react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
// import queryPosts from '../graph/Post'
import Header from './commons/Header'
import Search from './commons/Search'
// import LaTex from './commons/LaTeX'
import Error from './commons/Error'
import LaTexContainer from './commons/LaTexContainer'

const Author = styled.div`
  font-size: 10px;
  color: grey;
`

const Status = styled.span`
  font-size: 15px;
  color: green;
`

class Catalog extends Component {
  onClick(index, status) {
    // console.log(this.state.problems[index])
    const post = this.props.data.Tag.posts[index]
    // this.props.changePage(this.state.problems[index], 'Paper')
    this.props.history.push('/paper', {
      post: post,
      done: status === 'Done',
      tag: this.props.data.Tag.name
    })
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

  renderProblems(title, user) {
    if (this.props.data.loading) {
      return (
        <Error message="Loading..." />
      )
    }
    else if (!this.props.data || !this.props.data.Tag) {
      if (this.props.data.error) {
        return (
          <Error message="No Internet Connection. Please refresh this page." />
        )
      }
      else {
        return (
          <Error message={`0 Problems in ${title}`} />
        )
      }
    }
    return this.props.data.Tag.posts.map((problem, index) => {
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
                justifyContent: 'space-between'
              }}
            >
              <span>{problem.title}</span>
            </Card.Header>
            <Card.Meta
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between'
              }}
            >
              <span>{problem.difficulty}</span>
              <Author>Posted by {problem.author.name}</Author>
            </Card.Meta>
            <Card.Description
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between'
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

  render() {
    const title = this.props.match.params.title
    return (
      <div>
        <Header text={title} />
        <Search />
        <Card.Group
          style={{ display: 'flex', justifyContent: 'center', margin: 0 }}
        >
          {this.renderProblems(title, this.props.userQuery.user)}
        </Card.Group>
      </div>
    )
  }
}

Catalog.defaultProps = {
  title: 'Course'
}

Catalog.propTypes = {
  title: PropTypes.string
}

// const mapDispatchToProps = dispatch => bindActionCreators({
//   changePage: (problem, page) => push(`/${page}`, { data: problem }),
// }, dispatch)

// export default connect(
//   null,
//   mapDispatchToProps,
// )(Catalog)

const postQuery = gql`
  query($title: String!) {
    Tag(name: $title) {
      name
      posts {
        id
        title
        latex
        difficulty
        description
        solutions {
          author {
            id
          }
        }
        author {
          name
          id
        }
      }
    }
  }
`

const userQuery = gql`
query {
  user {
    id
  }
}
`

export default withRouter(
  graphql(postQuery, {
    options: ownProps => ({ variables: { title: ownProps.match.params.title } })
  })(graphql(userQuery, { name: 'userQuery' })(Catalog))
)
