import React, { Component } from 'react'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'
import { Card, Button, Form, TextArea } from 'semantic-ui-react'
import { gql, graphql } from 'react-apollo'
import uuid from 'uuid'
import LaTex from './commons/LaTeX'
import Header from './commons/Header'
import Error from './commons/Error'

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
  static renderMethods(answers) {
    if (!answers) {
      return <div>Not Availiable</div>;
    }

    return answers.map((answer) => {
      const latex = answer.latex
      const description = answer.text
      let header = ''
      if (latex) {
        header = <LaTex text={latex} id={uuid()} />
      }

      let meta = ''
      if (description) {
        meta = <Card.Meta>{description}</Card.Meta>
      }

      return (
        <Card key={answer.id} style={{ width: '100%' }}>
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
    if (this.props.data.loading) {
      return <Error message="Loading..." />
    }
    // const methods = this.state.methods
    const solutions = this.props.data.Post.solutions
    return solutions.map((solution, index) => {
      const genuiusButton = (solution.rated ? <Button onClick={() => this.onGenuiusPress(index)} icon="rocket" content="Genuius!" negative /> : <Button onClick={() => this.onGenuiusPress(index)} icon="rocket" content="Genuius!" />)
      const commentButton = (solution.comment ? <Button onClick={() => this.onCommentPress(index)} icon="comment" content="Comment" positive /> : <Button onClick={() => this.onCommentPress(index)} icon="comment" content="Comment" />)
      const commentForm = (solution.comment ? (<Form style={{ padding: '10px 0 0 0' }}>
        <TextArea autoHeight placeholder="Any Suggestions ?" />
        <Form.Button floated="right">Submit</Form.Button>
      </Form>) : <div />)
      return (
        <Container key={solution.id}>
          <Cover>
            <Author>Solved by {solution.author.name}</Author>
            <Rate>{solution.rate} Upvote</Rate>
          </Cover>
          {Answer.renderMethods(solution.answers)}
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

const answerQuery = gql`
query($id: ID!) {
  Post(id: $id) {
    solutions {
      id
      rate
      author {
        name
      }
      answers {
        id
        latex
        text
      }
    }
  }
}
`

// export default withRouter(Answer)

export default (
  graphql(answerQuery, {
    options: ownProps => ({ variables: { id: ownProps.location.state } })
  })(withRouter(Answer))
)
