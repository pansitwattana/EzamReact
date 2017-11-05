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
  }

  handleKeyboard(key) {
    math.typed(key, this.state.problemId)
  }

  submit = () => {
    const latex = math.getLaTeX(this.state.problemId)
    if (!latex || latex == '') {
      return;
    } 
    const user = this.props.data.user
    if (!user) {
      console.error('user not login')
      return;
    }
    
    console.log('submit', latex)
    const variables = {
      title: 'Differential',
      authorId: user.id,
      latex,
      description: ''
    }
    this.props.createPost({ variables })
      .then((res) => {
        console.log(res)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  render() {
    const { symbol, value, action } = Math
    return (
      <div>
        <Header text="Add Problem" />
        <Question>
          <MathInput id={this.state.problemId} />
        </Question>
        {/* <Header text="Add Solution" />
        <Question>
          <Input id={this.state.solutionId} />
        </Question> */}
        <Form>
          <InputContainer>
            <span>Title</span>
            <Input placeholder='eg. Calculus, Function' />
          </InputContainer>
          <br />
          <Button style={{ padding: 10 }} icon onClick={this.submit}>
            <Icon name='send' />
            Submit
          </Button>
        </Form>
        <Keyboard keySymbols={symbol} keyValues={value} action={action} onPress={key => this.handleKeyboard(key)} />
      </div>
    )
  }
}

const createPost = gql`
mutation ($title: String!, $authorId: ID!, $latex: String!  $description: String){
  createPost (
    title: $title
    authorId: $authorId
    latex: $latex
    description: $description
    tagsIds: ["cj9b4w85l0vxn01483g8nhxza"]
  ) {
    id
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

export default graphql(createPost, { name: 'createPost' })(
  graphql(userQuery, { options: { fetchPolicy: 'network-only' }} )(withRouter(Problem))
)
