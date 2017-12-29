import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { gql, graphql } from 'react-apollo'
import { Card } from 'semantic-ui-react'
import Header from './commons/Header'
import Search from './commons/Search'
import PostContainer from './commons/PostContainer'
import Error from './commons/Error'

class MyPosts extends Component {
  renderPost(title) {
    if (this.props.userQuery.loading) {
      return <Error message="Loading..." />
    } else if (!this.props.userQuery || !this.props.userQuery.user) {
      if (this.props.userQuery.error) {
        return <Error message="No Internet Connection. Please refresh this page." />
      }
      return <Error message={`0 Problems in ${title}`} />
    }
    return <PostContainer posts={this.props.userQuery.user.posts} user={this.props.userQuery.user} />
  }

  render() {
    const title = 'All Posts'

    return (
      <div>
        <Header text={title} />
        <Search />
        <Card.Group
          style={{ display: 'flex', justifyContent: 'center', margin: 0 }}
        >
          {this.renderPost(title)}
        </Card.Group>
      </div>
    )
  }
}

const userQuery = gql`
query {
  user {
    id
    posts {
      id
      title
      latex
      imageurl
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

export default withRouter(graphql(userQuery, { name: 'userQuery' })(MyPosts))
