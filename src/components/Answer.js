import React, { Component } from 'react'
import styled from 'styled-components'
import { Card, Button, Form, TextArea } from 'semantic-ui-react'
import uuid from 'uuid'
import LaTex from './commons/LaTeX'
import Header from './commons/Header'

const Container = styled.div`
  margin: 10px 10px 50px 10px;
`

const Cover = styled.div`
  display: flex;
  justify-content: space-between;
`

const Author = styled.div`

`

const Rate = styled.div`
  
`

class Answer extends Component {
  static renderMethods(methods) {
    if (!methods) {
      return <div>Not Availiable</div>;
    }

    return methods.map((method) => {
      const latex = method.text
      const description = method.meta
      let header = ''
      if (latex) {
        header = <LaTex text={latex} id={uuid()} />
      }

      let meta = ''
      if (description) {
        meta = <Card.Meta>{description}</Card.Meta>
      }

      return (
        <Card key={method.id} style={{ width: '100%' }}>
          <Card.Content>
            <Card.Header>
              {header}
            </Card.Header>
            {meta}
          </Card.Content>
        </Card>
      )
    })
  }

  state = {
    id: 1,
    methods: [
      {
        author: 'Karn Patanukum',
        userType: 'Teacher',
        id: 1,
        rate: 22,
        comment: false,
        rated: false,
        values: [
          {
            text: 'x^2+3x-10=0',
            meta: 'Two factor',
            id: uuid(),
          },
          {
            text: '(x+5)(x-2)=0',
            meta: '+5 multiply -2 equals -10',
            id: uuid(),
          },
          {
            text: 'x=-5,\\space2',
            id: uuid(),
          },
        ],
      },
      {
        author: 'Pansit',
        userType: 'Student',
        id: 2,
        rate: 5,
        comment: false,
        rated: false,
        values: [
          {
            text: 'x=\\frac{-b\\pm\\sqrt{b^2-4ac}}{2a}',
            meta: 'Quadratic Formular',
            id: uuid(),
          },
          {
            text: 'x=\\frac{-3\\pm\\sqrt{9-4\\times1\\times-10}}{2}',
            meta: 'Subsitution',
            id: uuid(),
          },
          {
            text: 'x=\\frac{-3\\pm\\sqrt{49}}{2}',
            id: uuid(),
          },
          {
            text: 'x=-\\frac{3}{2}\\pm\\frac{7}{2}',
            id: uuid(),
          },
          {
            text: 'x=-5,\\space2',
            id: uuid(),
          },
        ],
      },
    ],
  }

  onCommentPress = (index) => {
    const methods = this.state.methods
    const method = methods[index]
    if (method) {
      method.comment = !method.comment
    }
    this.setState({ methods })
  }

  onGenuiusPress = (index) => {
    const methods = this.state.methods
    const method = methods[index]
    if (method) {
      method.rated = !method.rated
      method.rate += method.rated ? 1 : -1
    }
    this.setState({ methods })
  }

  generateAnswers() {
    const methods = this.state.methods
    return methods.map((method, index) => {
      const genuiusButton = (method.rated ? <Button onClick={() => this.onGenuiusPress(index)} icon="rocket" content="Genuius!" negative /> : <Button onClick={() => this.onGenuiusPress(index)} icon="rocket" content="Genuius!" />)
      const commentButton = (method.comment ? <Button onClick={() => this.onCommentPress(index)} icon="comment" content="Comment" positive /> : <Button onClick={() => this.onCommentPress(index)} icon="comment" content="Comment" />)
      const commentForm = (method.comment ? (<Form style={{ padding: '10px 0 0 0' }}>
        <TextArea autoHeight placeholder="Any Suggestions ?" />
        <Form.Button floated="right">Submit</Form.Button>
      </Form>) : <div />)
      return (
        <Container key={method.id}>
          <Cover>
            <Author>Solved by {method.author}</Author>
            <Rate>{method.rate} Upvote</Rate>
          </Cover>
          {Answer.renderMethods(method.values)}
          <Button.Group labeled style={{ width: '100%' }}>
            {genuiusButton}
            <Button.Or />
            {commentButton}
          </Button.Group>
          {commentForm}
        </Container>)
    })
  }

  render() {
    return (<div>
      <Header text="Answer Sheet" />
      {this.generateAnswers()}
    </div>)
  }
}

export default Answer
