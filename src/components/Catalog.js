import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { gql, graphql } from 'react-apollo'
import { Card } from 'semantic-ui-react'
import Header from './commons/Header'
import Search from './commons/Search'
import PostContainer from './commons/PostContainer'
import Error from './commons/Error'

class Catalog extends Component {
  renderPost(title) {
    if (this.props.data.loading) {
      return <Error message="Loading..." />
    } else if (!this.props.data || !this.props.data.Tag) {
      if (this.props.data.error) {
        return <Error message="No Internet Connection. Please refresh this page." />
      }
      return <Error message={`0 Problems in ${title}`} />
    }
    return <PostContainer posts={this.props.data.Tag.posts} user={this.props.userQuery.user} />
  }

  render() {
    const { title } = this.props.match.params

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
        tags {
          name
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
