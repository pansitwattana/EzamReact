import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { gql, graphql } from 'react-apollo'
import styled from 'styled-components'
import { Card, Dropdown, Input } from 'semantic-ui-react'
import PostContainer from './commons/PostContainer'
import Error from './commons/Error'

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const product = list => list.reduce((prev, curr) => prev * curr, 1)

const calculateBaye = (solutions, user, post) => {
  const userSolutions = solutions.filter(solution => solution.author.id === user.id)
  if (userSolutions.length > 0) {
    console.log(userSolutions[0])
    const solution = userSolutions[0]
    const totallyCorrect = solution.errorCount > 0
    let p
    if (totallyCorrect) {
      p = post.solutions.filter(solution => solution.errorCount > 0).length + 1
      p /= (post.solutions.length + 1)
    } else {
      p = post.solutions.filter(solution => solution.errorCount === 0).length + 1
      p /= (post.solutions.length + 1)
    }
    return p
  }
  return 0
}

class Catalog extends Component {
  state = {
    filter: 'Filter'
  }

  getPosts(filter, user) {
    const posts = this.props.data.Tag.posts
    if (filter === 'Filter') {
      return posts
    }

    let filterPosts = posts.slice()
    if (filter === 'Most Solved') {
      filterPosts = filterPosts.sort((a, b) => {
        let solve1 = a.solutions.length
        let solve2 = b.solutions.length
        return solve2 - solve1
      })
    } else if (filter === "Answer") {
      filterPosts = filterPosts.filter(({ author, solutions }) => solutions.filter(solution => solution.author.id === author.id).length > 0)
    } else if (filter === "Haven't Done" && user) {
      filterPosts = filterPosts.filter(({ solutions }) => solutions.filter(({ author }) => author.id === user.id).length === 0)
    } else if (filter === 'Suggestion' && user) {
      const userDones = filterPosts.filter(({ solutions }) => solutions.filter(({ author }) => author.id === user.id).length > 0)
      const notDonePosts = filterPosts.filter(({ solutions }) => solutions.length > 0 && solutions.filter(({ author }) => author.id === user.id).length === 0)
      console.log(notDonePosts)
      filterPosts = notDonePosts.sort((a, b) => {
        const probsA = userDones.map(({ solutions }) => calculateBaye(solutions, user, a))
        const probsB = userDones.map(({ solutions }) => calculateBaye(solutions, user, b))
        const productPa = product(probsA)
        const productPb = product(probsB)
        console.log(probsA, probsB)
        console.log(productPa, productPb)
        return productPa - productPb
      })
    }
    return filterPosts
  }

  renderPost(title) {
    if (this.props.data.loading) {
      return <Error message="Loading..." />
    } else if (!this.props.data || !this.props.data.Tag) {
      if (this.props.data.error) {
        return <Error message="No Internet Connection. Please refresh this page." />
      }
      return <Error message={`0 Problems in ${title}`} />
    }

    const { user } = this.props.userQuery

    return <PostContainer posts={this.getPosts(this.state.filter, user)} user={user} />
  }

  render() {
    const { title } = this.props.match.params
    const loading = this.props.data.loading
    return (
      <div>
        <Header>
          <Input loading={loading} placeholder='Search...' />
          <Dropdown style={{ padding: '0px 5px'}} text={this.state.filter} >
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => this.setState({ filter: 'Most Solved' })} text='Most Solved' />
              <Dropdown.Item onClick={() => this.setState({ filter: "Answer" })} text="Answered" />
              <Dropdown.Item onClick={() => this.setState({ filter: "Haven't Done" })} text="Haven't Done" />
              <Dropdown.Item onClick={() => this.setState({ filter: 'Recently' })} text='Recently' />
              <Dropdown.Item onClick={() => this.setState({ filter: 'No Answer' })} text='No Answer' />
              <Dropdown.Item onClick={() => this.setState({ filter: 'Suggestion' })} text='Suggestion' />
            </Dropdown.Menu>
          </Dropdown>
        </Header>
        <Card.Group
          style={{ 
            display: 'flex',
            justifyContent: 'center',
            margin: 0,
            overflow: 'auto',
            height: window.innerHeight - 50 - 38,
          }}
        >
          {this.renderPost(title)}
        </Card.Group>
      </div>
    )
  }
}

const postQuery = gql`
  query($title: String!) {
    Tag(name: $title) {
      name
      posts {
        id
        title
        latex
        difficulty
        solutions {
          id
          author {
            id
          }
          errorCount
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

export default withRouter(graphql(postQuery, {
  options: ownProps => ({ variables: { title: ownProps.match.params.title } }),
})(graphql(userQuery, { name: 'userQuery' })(Catalog)))
