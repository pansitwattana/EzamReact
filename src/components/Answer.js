import React, { Component } from 'react'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'
import { Card, Button, Icon, Popup, Form, TextArea } from 'semantic-ui-react'
import { gql, graphql } from 'react-apollo'
import uuid from 'uuid'
import LaTex from './commons/LaTeX'
import Header from './commons/Header'
import Error from './commons/Error'
import { read } from 'fs';

const Container = styled.div`
  margin: 10px 10px 50px 10px;
`

const Cover = styled.div`
  display: flex;
  justify-content: space-between;
`

const Author = styled.div`

`

const Option = styled.div`
  display: flex;
  justify-content: space-between;
  width: 25%;
`

class Answer extends Component {
  static renderMethods(answers) {
    if (!answers) {
      return <div>Not Availiable</div>;
    }

    return answers.map((answer) => {
      const { latex } = answer
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

  // state = {
  //   methods: [
  //     {
  //       author: 'Karn Patanukum',
  //       userType: 'Teacher',
  //       id: 1,
  //       rate: 22,
  //       comment: false,
  //       rated: false,
  //       values: [
  //         {
  //           text: 'x^2+3x-10=0',
  //           meta: 'Two factor',
  //           id: uuid(),
  //         },
  //         {
  //           text: '(x+5)(x-2)=0',
  //           meta: '+5 multiply -2 equals -10',
  //           id: uuid(),
  //         },
  //         {
  //           text: 'x=-5,\\space2',
  //           id: uuid(),
  //         },
  //       ],
  //     },
  //     {
  //       author: 'Pansit',
  //       userType: 'Student',
  //       id: 2,
  //       rate: 5,
  //       comment: false,
  //       rated: false,
  //       values: [
  //         {
  //           text: 'x=\\frac{-b\\pm\\sqrt{b^2-4ac}}{2a}',
  //           meta: 'Quadratic Formular',
  //           id: uuid(),
  //         },
  //         {
  //           text: 'x=\\frac{-3\\pm\\sqrt{9-4\\times1\\times-10}}{2}',
  //           meta: 'Subsitution',
  //           id: uuid(),
  //         },
  //         {
  //           text: 'x=\\frac{-3\\pm\\sqrt{49}}{2}',
  //           id: uuid(),
  //         },
  //         {
  //           text: 'x=-\\frac{3}{2}\\pm\\frac{7}{2}',
  //           id: uuid(),
  //         },
  //         {
  //           text: 'x=-5,\\space2',
  //           id: uuid(),
  //         },
  //       ],
  //     },
  //   ],
  // }

  // componentDidMount() {
  //   this.props.history.listen((location, action) => {
  //     // location is an object like window.location
  //     console.log(action, location.pathname, location.state)
  //     if (action === 'POP' && location.pathname === '/paper') {
  //       const { tag } = this.props.location.state
  //       console.log(tag)
  //       if (tag) { this.props.history.push(`/catalog/${tag}`) }
  //     }
  //   })
  // }

  onCommentPress = (index) => {
    const { methods } = this.state
    const method = methods[index]
    if (method) {
      method.comment = !method.comment
    }
    this.setState({ methods })
  }

  onGenuiusPress = (index) => {
    const { methods } = this.state
    const method = methods[index]
    if (method) {
      method.rated = !method.rated
      method.rate += method.rated ? 1 : -1
    }
    this.setState({ methods })
  }

  deleteAnswer(answers) {
    return new Promise((resolve, reject) => {
      let reqCount = 0
      const length = answers.length
      if (length === 0) {
        resolve()
      }
      answers.forEach(answer => {
        const variables = { id: answer.id }
        this.props.deleteAnswer({ variables })
          .then(res => {
            reqCount++
            console.log(reqCount)
            if (reqCount === length) {
              resolve(res)
            }
          })
          .catch(error => {
            reject(error)
          })
      })
    })
  }

  deleteSolution(solution) {
    const variables = { id: solution.id }
    this.props.deleteSolution({ variables })
      .then(res => this.props.data.refetch())
      .catch(err => console.error(err))
  }
  
  editAnswer(solution, postId) {
    if (postId && solution)
      this.props.history.push(`/paper/${postId}`, { solution })
  }

  submitDelete = (solution) => {
    this.deleteAnswer(solution.answers)
      .then(res => {
        this.deleteSolution(solution)
      })
      .catch(error => console.error(error))
  }

  generateAnswers() {
    if (this.props.data.loading || this.props.userQuery.loading) {
      return <Error message="Loading..." />
    }
    const { error } = this.props.data
    if (error) {
      return <Error message={error.message} />
    }
    const userError = this.props.userQuery.error
    if (userError) {
      return <Error message={userError.message} />
    }

    const { solutions, id } = this.props.data.Post
    const postId = id
    if (solutions.length === 0) {
      return <Error message="No Answer Found" />
    }

    return solutions.map((solution, index) => {
      const isAuthor = solution.author.id === this.props.userQuery.user.id
      const { id } = solution
      const answerHeader = isAuthor ? (
        <div>
          <Author>Your Solution</Author>
          <Button onClick={() => this.editAnswer(solution, postId)}>Edit</Button>
        </div>
      ) : <Author>{`Solved by ${solution.author.name}`}</Author>

      const genuiusButton = (solution.rated ? <Button onClick={() => this.onGenuiusPress(index)} icon="rocket" content="Genuius!" negative /> : <Button onClick={() => this.onGenuiusPress(index)} icon="rocket" content="Genuius!" />)
      const commentButton = (solution.comment ? <Button onClick={() => this.onCommentPress(index)} icon="comment" content="Comment" positive /> : <Button onClick={() => this.onCommentPress(index)} icon="comment" content="Comment" />)
      const commentForm = (solution.comment ? (
        <Form style={{ padding: '10px 0 0 0' }}>
          <TextArea autoHeight placeholder="Any Suggestions ?" />
          <Form.Button floated="right">Submit</Form.Button>
        </Form>) : <div />)
      const commentGroup = isAuthor ? <div /> : (
        <Button.Group labeled style={{ width: '100%' }}>
          {genuiusButton}
          <Button.Or />
          {commentButton}
        </Button.Group>)
      return (
        <Container key={solution.id}>
          <Cover>
            {answerHeader}
            <Option>
              <div>
                {solution.rate} Upvote
              </div>
              <Popup
                trigger={<Icon name='ellipsis horizontal' />}
                content={<Button onClick={() => this.submitDelete(solution)} color='red' content='Delete' />}
                on='click'
                position='top right'
              />
            </Option>
          </Cover>
          {Answer.renderMethods(solution.answers)}
          {commentGroup}
          {commentForm}
        </Container>)
    })
  }

  render() {
    return (
      <div>
        <Header text="Answer Sheet" />
        {this.generateAnswers()}
      </div>
    )
  }
}

const answerQuery = gql`
query($id: ID!) {
  Post(id: $id) {
    id
    solutions {
      id
      rate
      author {
        id
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

const deleteSolution = gql`
mutation($id: ID!) {
  deleteSolution(id: $id) {
    id
  }
}
`

const deleteAnswer = gql`
mutation($id: ID!) {
  deleteAnswer(id: $id) {
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
// export default withRouter(Answer)
const AnswerWithUser = graphql(userQuery, {
  name: 'userQuery',
  options: { fetchPolicy: 'network-only' },
})(Answer)

const AnswerWithDeleteSolution = graphql(deleteSolution, { name: 'deleteSolution' })(AnswerWithUser)

const AnswerWithAnswerSolution = graphql(deleteAnswer, { name: 'deleteAnswer' })(AnswerWithDeleteSolution)

export default (
  graphql(answerQuery, {
    options: ownProps => ({ variables: { id: ownProps.location.state.id } }),
  })(withRouter(AnswerWithAnswerSolution))
)
