import React, { Component } from 'react'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'
import  { Modal, Card, Button, Icon, Popup, Form, TextArea, Input } from 'semantic-ui-react'
import { gql, graphql } from 'react-apollo'
import uuid from 'uuid'
import deleteAnswerMutation from '../graph/deleteAnswer'
import deleteCommentMutation from '../graph/deleteComment'
import LaTex from './commons/LaTeX'
// import Header from './commons/Header'
import Error from './commons/Error'
import Screen from './commons/Screen'
import CommentList from './commons/CommentList'
import Label from './commons/CornerLabel'

const Container = styled.div`
  margin: 5px 0px 40px 0px;
  padding: 5px 10px 10px 10px;
  border: ${prop => prop.highlight ? `solid ${prop.highlightColor}` : 'none'};
  border-radius: 8px;
  border-width: 2px;
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
const AnswerContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

class AnswerMethods extends Component {

  state = {
    index: -1,
    id: '',
    text: '',
  }

  onEditClick = (index, id) => {
    if (index !== this.state.index) {
      this.setState({ index, text: '', id }, () => {
        this.inputRef.focus()
      })
    } 
    else {
      this.setState({ index: -1 })
    }
  }

  handleRef = (inputRef) => {
    this.inputRef = inputRef
  }

  onKeyPress = (e) => {
    if (e.key === 'Enter') {
      const variables = {
        answerId: this.state.id,
        text: e.target.value,
      }
      this.props.onSubmit(variables)
      this.setState({
        index: -1,
        id: '',
        text: '',
      })
    }
  }

  render() {
    const { answers, isAuthor, onSubmit } = this.props
    if (!answers) {
      return <div>Not Availiable</div>;
    }

    return answers.map((answer, index) => {
      const { latex, id } = answer
      const description = answer.text
      let header = ''
      if (latex) {
        header = <LaTex text={latex} id={uuid()} />
      }
      let meta = <div>{description}</div>
      const selected = index === this.state.index
      if (selected) {
        meta = <Input onKeyPress={this.onKeyPress} ref={this.handleRef} size="tiny" placeholder='Type description' focus value={this.state.text || description} onChange={(event) => this.setState({ text: event.target.value })} />
      }

      return (
        <Card key={answer.id} style={{ width: '100%' }}>
          <Card.Content>
            <Card.Header>
              <AnswerContainer>
                {header}
                {isAuthor ? <Icon onClick={() => this.onEditClick(index, id)} style={{ cursor: 'pointer' }} color='#ddd' name={selected ? "minus circle" : "add circle"} /> : <div />}
              </AnswerContainer>
            </Card.Header>
            <Card.Meta>{meta}</Card.Meta>
          </Card.Content>
        </Card>
      )
    })
  }

}

class Answer extends Component {
  static dataLoaded = false
  static userLoaded = false

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
      this.dataLoaded = true  
    } else if (!nextProps.userQuery.loading && this.props.userQuery.loading) {
      this.userLoaded = true
    }
    if (this.dataLoaded && this.userLoaded) {
      const { solutions } = nextProps.data.Post
      const { user } = nextProps.userQuery
      this.reload(solutions, user)
      this.dataLoaded = false
      this.userLoaded = false
    }
  }

  reload(solutions, user, ownerId) {
    if (solutions && user) {
      let solutionsToState = solutions.map(solution => {
        const { id, _votedMeta, author } = solution
        const rate = user.votes.reduce((prev, curr) => curr.id === id || prev, false)
        return { id, comment: false, rate, rateCount: _votedMeta.count, author }
      })
      const userId = user.id
      solutionsToState = solutionsToState.sort((a, b) => {
          let aScore = a.rateCount
          let bScore = b.rateCount
          const aSolutionAuthorId = a.author.id
          const bSolutionAuthorId = b.author.id
          if (aSolutionAuthorId === ownerId) {
            aScore = 1000000
          }
          else if (aSolutionAuthorId === userId) {
            aScore = 999999
          }
          
          if (bSolutionAuthorId === ownerId) {
            bScore = 1000000
          }
          else if (bSolutionAuthorId === userId) {
            bScore = 999999
          }
    
          return bScore - aScore
          // a.author.id !== userId && a.author.id !== ownerId) && a._votedMeta.count < b._votedMeta.count
        })

      // solutionsToState = solutionsToState.sort((a, b) => a.rateCount < b.rateCount || a.author.id !== ownerId || a.author.id !== user.id)
      this.setState({ solutions: solutionsToState })
    }
  }

  onCommentPress = (id) => {
    const { solutions } = this.state
    const filterSolution = solutions.filter(solution => solution.id === id)
    if (filterSolution.length > 0) {
      const solution  = filterSolution[0]
      solution.comment = !solution.comment
      this.setState({ solutions })
    }
  }

  onGenuiusPress = (id) => {
    const { solutions } = this.state
    const filterSolution = solutions.filter(solution => solution.id === id)
    if (filterSolution.length === 0) {
      return
    }

    const solution  = filterSolution[0]

    const { user } = this.props.userQuery
    if (!user) { return }

    // const { rateCount } = solution
    const userVotes = user.votes.map(vote => vote.id)

    solution.rate = !solution.rate
    solution.rateCount += solution.rate ? 1 : -1
    this.setState({ solutions })

    let votes
    if (solution.rate) {
      votes = [...userVotes, id]
    } 
    else {
      votes = userVotes.filter(sid => sid !== id)
    }
    console.log(votes)
    const variables = { userId: user.id, solutionIds: votes }
    this.props.voteSolution({ variables })
        .then(res => console.log(res))
        .catch(error => console.error(error))
  }

  onCommentDelete = (id) => {
    if (id) {
      const variables = { id }
      this.props.deleteComment({ variables })
        .then(res => this.props.data.refetch())
        .catch(error => console.log(error))
    }
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
      
      textArea.value = ""

      this.props.postComment({ variables })
        .then(res => this.props.data.refetch())
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
      .then(res => {
        this.props.data.refetch()
        this.props.userQuery.refetch()
      })
      .catch(err => console.error(err))
    }
    
  editAnswer(solution, postId) {
    if (postId && solution)
    this.props.history.push(`/paper/${postId}`, { solution })
  }
  
  
  onDescriptionUpdate = (variables) => {
    this.props.updateDescription({ variables })
      .then(res => this.props.data.refetch())
      .catch(error => console.error(error))
  }

  submitDelete = (solution) => {
    deleteAnswerMutation(solution.answers, this.props.deleteAnswer)
      .then(res => {
        deleteCommentMutation(solution.comments, this.props.deleteComment)
          .then(result => this.deleteSolution(solution))
          .catch(error => console.error(error))
      })
      .catch(error => console.error(error))
  }

  submitReport = (senderId, solutionId) => {
    const variables = { senderId, solutionId }
    this.props.submitReport({ variables })
      .then(res => console.log(res))
      .catch(err => console.error(err))
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

    const { solutions, id, author } = this.props.data.Post
    const postId = id
    const ownerId = author.id
    if (solutions.length === 0) {
      return <Error message="No Answer Found" />
    }
    const states = this.state.solutions
    let sortedSolution = [...solutions]
    const userId = this.props.userQuery.user.id
    sortedSolution = sortedSolution.sort((a, b) => {
      let aScore = a._votedMeta.count
      let bScore = b._votedMeta.count
      const aSolutionAuthorId = a.author.id
      const bSolutionAuthorId = b.author.id
      if (aSolutionAuthorId === ownerId) {
        aScore = 999999
      }
      else if (aSolutionAuthorId === userId) {
        aScore = 1000000
      }
      
      if (bSolutionAuthorId === ownerId) {
        bScore = 999999
      }
      else if (bSolutionAuthorId === userId) {
        bScore = 1000000
      }

      return bScore - aScore
      // a.author.id !== userId && a.author.id !== ownerId) && a._votedMeta.count < b._votedMeta.count
    })
    return sortedSolution.map((solution, index) => {
      const filterStates = states.filter(state => state.id === solution.id)
      if (filterStates.length === 0) {
        return <Error message="Loading..." />
      }
      const state = filterStates[0]
      const solutionCreatorId = solution.author.id
      const isAuthor = solutionCreatorId === userId
      const isOwner = solutionCreatorId === ownerId
      // console.log({ isAuthor, isOwner, index })
      const { id, comments, author, answers } = solution
      const { rateCount, rate, comment } = state
      const answerHeader = isAuthor ? (
        <div>
          <Author>Your Solution</Author>
          <Button onClick={() => this.editAnswer(solution, postId)}>Edit</Button>
        </div>
      ) : <Author>{`Solved by ${author.name}`}</Author>

      const genuiusButton = (rate ? <Button onClick={() => this.onGenuiusPress(id)} icon="rocket" content="Genuius!" negative /> : <Button onClick={() => this.onGenuiusPress(id  )} icon="rocket" content="Genuius!" />)
      const commentButton = (comment ? <Button onClick={() => this.onCommentPress(id)} icon="comment" content="Comment" positive /> : <Button onClick={() => this.onCommentPress(id)} icon="comment" content="Comment" />)
      const commentList = (comment ? <CommentList comments={comments} userId={userId} onDelete={this.onCommentDelete} /> : <div />)
      const commentForm = (comment ? (
        <Form style={{ padding: '10px 0 0 0' }} onSubmit={(event) => this.submitComment(event, id)}>
          <TextArea autoHeight placeholder="Any Suggestions ?"  />
          <Form.Button floated="right">Submit</Form.Button>
        </Form>) : <div />)
      const commentGroup = (
          <Button.Group labeled style={{ width: '100%' }}>
            {genuiusButton}
            <Button.Or />
            {commentButton}
          </Button.Group>
        )
      return (
        <Card key={id} style={{ width: '98%', marginLeft: '1%', marginRight: '1%' }}>
          <Label text={isOwner ? 'Owner' : 'Yours'} show={isAuthor || isOwner} color={isOwner ? 'red' : 'green'}/>
          <Container>
            <Cover>
              {answerHeader}
              <Option>
                <div>
                  {rateCount} Vote
                </div>
                <Popup
                  trigger={<Icon name='ellipsis horizontal' />}
                  content={
                    <div>
                      {isAuthor ? (<Button onClick={() => this.submitDelete(solution)} color='red' content='Delete' />) :
                        (<Button onClick={() => this.submitReport(userId, id)} content='Report' />)}
                    </div>
                  }
                  on='click'
                  position='top right'
                />
              </Option>
            </Cover>
            <AnswerMethods answers={answers} isAuthor={isAuthor} onSubmit={this.onDescriptionUpdate} />
            {commentGroup}
            {commentList}
            {commentForm}
          </Container>
        </Card>)
    })
  }

  render() {
    const post = this.props.data.Post
    const display = post ? post.latex : ''
    console.log(display)
    return (
      <div>
        <Screen displayText={display} onSubmit={() => console.log('submit')} hideButton={true} />
        <div style={{
          overflow: 'auto',
          height: window.innerHeight - 118,
          marginTop: '5px',
        }}>
          {this.generateAnswers()}
        </div>
      </div>
    )
  }
}

const answerQuery = gql`
  query($id: ID!) {
    Post(id: $id) {
      id
      latex
      author {
        id
      }
      solutions {
        id
        rateCount
        _votedMeta {
          count
        }
        comments {
          id
          text
          createdAt
          author {
            id
            name
          }
        }
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

// const uploadImage = gql`
//   mutation {
//     createFile(
//       name: $name
//       postId:
//     )
//   }
// `

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
      votes {
        id
      }
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

const deleteComment = gql`
  mutation($id: ID!) {
    deleteComment(id: $id) {
      id
    }
  }
`

const voteSolution = gql`
  mutation($userId: ID!, $solutionIds: [ID!]!) {
    updateUser (
      id: $userId
      votesIds: $solutionIds
    ) {
      id
      votes {
        id
      }
    }
  }
`

const addDescription = gql`
  mutation($answerId: ID!, $text: String!) {
    updateAnswer(
      id: $answerId
      text: $text
    ) {
      id
    }
  }
`

const submitReport = gql`
  mutation($senderId: ID!, $solutionId: ID!) {
    createReport(
      senderId: $senderId
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

const AnswerWithDeleteComment = graphql(deleteComment, { name: 'deleteComment' })(AnswerWithPostComment)

const AnswerWithVoteSolution = graphql(voteSolution, { name: 'voteSolution' })(AnswerWithDeleteComment)

const AnswerWithAddDescription = graphql(addDescription, { name: 'updateDescription' })(AnswerWithVoteSolution)

const AnswerWithReportSubmit = graphql(submitReport, { name: 'submitReport' })(AnswerWithAddDescription)

export default (
  graphql(answerQuery, {
    options: ownProps => ({ 
      variables: { id: ownProps.location.state.id },
      fetchPolicy: 'network-only',
    })
  })(withRouter(AnswerWithReportSubmit))
)
