import React, { Component } from 'react'
import uuid from 'uuid'
import { gql, graphql } from 'react-apollo'
import { Button, Icon, Input } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'
import { Math } from './data/Keyboards'
import math from './paper/MathQuill'
import Keyboard from './commons/Keyboard'
import styled from 'styled-components'
import MathInput from './commons/Input'
import Options from './commons/Options'
import Header from './commons/Header'

const Question = styled.div`
  margin: 10px;
  height: 70px;
  background: #FFF;
  border-radius: 2px;
  box-shadow:
    0 2px 2px 0 rgba(0,0,0,.07),
    0 3px 1px -2px rgba(0,0,0,.1),
    0 1px 5px 0 rgba(0,0,0,.06);
`

const Form = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const InputContainer = styled.div`
  display: flex;
  align-items: center;
`

class Problem extends Component {
  state = {
    problemId: uuid(),
    title: '',
    selectedTags: [],
    tags: [{
      key: '1212',
      text: 'Calculus',
      value: 'Calculus',
    }],
    showKeyboard: true,
  }

  handleKeyboard(key) {
    math.typed(key, this.state.problemId)
  }

  submit = () => {
    const latex = math.getLaTeX(this.state.problemId)
    if (!latex || latex === '') {
      alert('Please Input Problem')
      return;
    } 
    const user = this.props.data.user
    if (!user) {
      alert('user not login')
      return;
    }
    
    const tags = this.state.selectedTags
    const tagIds = []
    this.props.tagQuery.allTags.forEach((tag) => {
      if (tags.includes(tag.name)) {
        tagIds.push(tag.id)
      }
    })
    console.log(tagIds)
    const variables = {
      title: this.state.title,
      authorId: user.id,
      latex,
      description: '',
      difficulty: 'Easy',
      tagIds: tagIds
    }
    console.log('submit', variables)
    this.props.createPost({ variables })
      .then((res) => {
        const post = res.data.createPost
        this.props.history.push('./paper', {
          post: post,
          done: false,
        })
      })
      .catch((error) => {
        console.error(error)
      })
  }

  onTagAdded = (selectedTags) => {
    this.setState({ selectedTags })
  }

  render() {
    const { symbol, value, action } = Math
    const { selectedTags, problemId, showKeyboard } = this.state
    const { loading, allTags } = this.props.tagQuery
    const tags = loading ? [] : allTags.map(tag => ({ key: tag.id, text: tag.name, value: tag.name }))
    return (
      <div>
        <Header text="Post" />
        <span>Problem</span>
        <Question>
          <MathInput id={problemId} />
        </Question>
        {/* <Header text="Add Solution" />
        <Question>
          <Input id={this.state.solutionId} />
        </Question> */}
        <Form onFocus={() => this.setState({ showKeyboard: false })} onBlur={() => this.setState({ showKeyboard: true })}>
          <Options tags={tags} value={selectedTags} onChange={this.onTagAdded} />
          <br />
          <Input placeholder='Title' onChange={(e) => this.setState({ title: e.target.value})} />
          <br />
          <Button style={{ padding: 10 }} icon onClick={this.submit}>
            <Icon name='send' />
            Submit
          </Button>
        </Form>
        <Keyboard show={showKeyboard} keySymbols={symbol} keyValues={value} action={action} onPress={key => this.handleKeyboard(key)} />
      </div>
    )
  }
}
//SolutionanswersAnswer
const createPost = gql`
mutation ($title: String!, $authorId: ID!, $latex: String!  $description: String, $tagIds: [ID!], $difficulty: Difficulty){
  createPost (
    title: $title
    authorId: $authorId
    latex: $latex
    description: $description
    difficulty: $difficulty
    tagsIds: $tagIds
  ) {
    id
    title
    latex
    difficulty
    description
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

const tagQuery = gql`
query {
  allTags {
    id
    name
  }
}
`

export default graphql(createPost, { name: 'createPost' })(
  graphql(userQuery, { options: { fetchPolicy: 'network-only' }} )(
    graphql(tagQuery, { name: 'tagQuery' })(
      withRouter(Problem)
    )
  )
)
