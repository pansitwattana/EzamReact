import React, { Component } from 'react'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'
import { Card, Button, Icon, Popup, Form, TextArea } from 'semantic-ui-react'
import { gql, graphql } from 'react-apollo'
import uuid from 'uuid'
import deleteAnswerMutation from '../graph/deleteAnswer'
import LaTex from './commons/LaTeX'
import Header from './commons/Header'
import Error from './commons/Error'
import { read } from 'fs';
import { debug } from 'util';

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

  state = {
    solutions: []
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

  componentWillReceiveProps(nextProps){
    if (!nextProps.data.loading && this.props.data.loading) {
      const solutions = nextProps.data.Post.solutions
      if (solutions) {
        let solutionsToState = solutions.map(solution => { 
          return { id: solution.id, comment: false, rate: false }
        })
        this.setState({ solutions: solutionsToState })
      }
    }
  }

  onCommentPress = (index) => {
    const { solutions } = this.state
    const solution = solutions[index]
    if (solution) {
      solution.comment = !solution.comment
    }
    this.setState({ solutions })
  }

  onGenuiusPress = (index) => {
    const { solutions } = this.state
    const solution = solutions[index]
    if (solution) {
      solution.rate = !solution.rate
      // solution.rate += solution.rated ? 1 : -1
    }
    this.setState({ solutions })
  }

  submitComment = (event, solutionId) => {
    if (event.target) {
      const textArea = event.target.firstChild
      if (!textArea) { return }

      const text = textArea.value
      if (!text) { return }

      const { user } = this.props.userQuery
      if (!user) { return }

      const authorId = user.id

      const variables = { text, solutionId, authorId }

      this.props.postComment({ variables })
        .then(res => textArea.value = "")
        .catch(error => console.error(error))
    }
  }

  // deleteAnswer(answers) {
  //   return new Promise((resolve, reject) => {
  //     let reqCount = 0
  //     const length = answers.length
  //     if (length === 0) {
  //       resolve()
  //     }
  //     answers.forEach(answer => {
  //       const variables = { id: answer.id }
  //       this.props.deleteAnswer({ variables })
  //         .then(res => {
  //           reqCount++
  //           console.log(reqCount)
  //           if (reqCount === length) {
  //             resolve(res)
  //           }
  //         })
  //         .catch(error => {
  //           reject(error)
  //         })
  //     })
  //   })
  // }

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
    deleteAnswerMutation(solution.answers, this.props.deleteAnswer)
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
    const states = this.state.solutions
    return solutions.map((solution, index) => {
      const state = states[index]
      const isAuthor = solution.author.id === this.props.userQuery.user.id
      const { id } = solution
      const answerHeader = isAuthor ? (
        <div>
          <Author>Your Solution</Author>
          <Button onClick={() => this.editAnswer(solution, postId)}>Edit</Button>
        </div>
      ) : <Author>{`Solved by ${solution.author.name}`}</Author>

      const genuiusButton = (state.rate ? <Button onClick={() => this.onGenuiusPress(index)} icon="rocket" content="Genuius!" negative /> : <Button onClick={() => this.onGenuiusPress(index)} icon="rocket" content="Genuius!" />)
      const commentButton = (state.comment ? <Button onClick={() => this.onCommentPress(index)} icon="comment" content="Comment" positive /> : <Button onClick={() => this.onCommentPress(index)} icon="comment" content="Comment" />)
      const commentForm = (state.comment ? (
        <Form style={{ padding: '10px 0 0 0' }} onSubmit={(event) => this.submitComment(event, id)}>
          <TextArea autoHeight placeholder="Any Suggestions ?"  />
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
                {solution.rateCount} Vote
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
        rateCount
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

const postComment = gql`
  mutation($solutionId: ID!, $text: String!, $authorId: ID!) {
    createComment(
      text: $text
      authorId: $authorId
      solutionId: $solutionId
    ) {
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

const AnswerWithPostComment = graphql(postComment, { name: 'postComment' })(AnswerWithAnswerSolution)

export default (
  graphql(answerQuery, {
    options: ownProps => ({ 
      variables: { id: ownProps.location.state.id },
      fetchPolicy: 'network-only',
    })
  })(withRouter(AnswerWithPostComment))
)
