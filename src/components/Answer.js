import React, { Component } from 'react'
import styled from 'styled-components'
import { Card, Button, Form, TextArea } from 'semantic-ui-react'
import PropTypes from 'prop-types'
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
  state = {
    id: 1,
    methods: {
      1: {
        name: 'Karn Patanukum',
        userType: 'Teacher',
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
      2: {
        name: 'Oil',
        userType: 'Student',
        id: 2,
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
    },
  }

  getAnswer(id) {
    const methodsList = this.state.methods
    if (!methodsList[id]) {
      return <div>no id found</div>;
    }

    const methods = methodsList[id].values
    if (!methods) {
      return <div>no values found</div>
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

  generateAnswer(userIds) {
    const users = [
      {
        name: 'Karn',
        id: 1,
        rate: 25,
      },
      {
        name: 'Pansit',
        id: 2,
        rate: 3,
      },
    ]
    return users.map(user => (
      <Container>
        <Cover>
          <Author>Solved by {user.name}</Author>
          <Rate>{user.rate} Upvote</Rate>
        </Cover>
        {this.getAnswer(user.id)}
        <Button.Group labeled style={{ width: '100%' }}>
          <Button icon="rocket" content="Genuius!" />
          <Button.Or />
          <Button icon="comment" content="Comment" />
        </Button.Group>
        <Form style={{ padding: '10px 0 0 0' }}>
          <TextArea autoHeight placeholder="Any Suggestions ?" />
          <Form.Button floated="right">Submit</Form.Button>
        </Form>
      </Container>))
  }

  render() {
    return (<div>
      <Header text="Answer Sheet" />
      {this.generateAnswer([1, 2])}
    </div>)
  }
}

export default Answer
