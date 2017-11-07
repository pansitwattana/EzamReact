import _ from 'lodash'
import React, { Component } from 'react'
import { Search, Grid, Header } from 'semantic-ui-react'
import { gql, graphql } from 'react-apollo'
// const source = _.times(5, () => ({
//   title: faker.company.companyName(),
//   description: faker.company.catchPhrase(),
//   image: faker.internet.avatar(),
//   price: faker.finance.amount(0, 100, 2, '$'),
// }))

class SearchComponent extends Component {
  state = {
    resuls: [],
    value: ''
  }

  resetComponent = () => this.setState({ results: [], value: '' })

  handleResultSelect = (e, { result }) => this.setState({ value: result.title })

  handleSearchChange = (e, { value }) => {
    const { loading, allPosts } = this.props.data
    const posts = allPosts.map(post => ({ key: post.id, title: post.title + ' ' + post.latex }))
    const newValue = value
    // this.setState({ value })
    console.log('search value: ',  newValue)
    console.log('search value: ',  allPosts)
    // setTimeout(() => {
    
    const re = new RegExp(_.escapeRegExp(value), 'i')
    const isMatch = result => re.test(result.title)
    this.setState({
      results: _.filter(posts, isMatch),
      value: newValue
    })
    // if (this.state.value.length < 1) return this.resetComponent()
    // }, 500)
  }

  render() {
    const { loading } = this.props.data
    const { results, value } = this.state
    return (
      <Search
        aligned='center' 
        loading={loading}
        onResultSelect={this.handleResultSelect}
        onSearchChange={this.handleSearchChange}
        results={results}
        value={value}
        {...this.state}
      />
    )
  }
}

const searchQuery = gql`
  query {
    allPosts {
      id
      title
      latex
    }
  }
`

export default graphql(searchQuery)(SearchComponent)
