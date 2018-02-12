import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { gql, graphql } from 'react-apollo'
import styled from 'styled-components'
import { Card, Dropdown } from 'semantic-ui-react'
import Search from './commons/Search'
import PostContainer from './commons/PostContainer'
import Error from './commons/Error'

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

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
    } else if (filter === "Owner's Answer") {
      filterPosts = filterPosts.filter(({ author, solutions }) => solutions.filter(solution => solution.author.id === author.id).length > 0)
    } else if (filter === "Haven't Done" && user) {
      filterPosts = filterPosts.filter(({ solutions }) => solutions.filter(({ author }) => author.id === user.id).length === 0)
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

    return (
      <div>
        <Header>
          <Search />
          <Dropdown style={{ padding: '0px 5px'}} text={this.state.filter} >
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => this.setState({ filter: 'Most Solved' })} text='Most Solved' />
              <Dropdown.Item onClick={() => this.setState({ filter: "Owner's Answer" })} text="Answered" />
              <Dropdown.Item onClick={() => this.setState({ filter: "Haven't Done" })} text="Haven't Done" />
              <Dropdown.Item onClick={() => this.setState({ filter: 'Recently' })} text='Recently' />
              <Dropdown.Item onClick={() => this.setState({ filter: 'No Answer' })} text='No Answer' />
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

export default withRouter(graphql(postQuery, {
  options: ownProps => ({ variables: { title: ownProps.match.params.title } }),
})(graphql(userQuery, { name: 'userQuery' })(Catalog)))
