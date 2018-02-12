import React, { Component } from 'react'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'
import { gql, graphql } from 'react-apollo'
import VirtualList from 'react-tiny-virtual-list'
import PropTypes from 'prop-types'
import uuid from 'uuid'
import 'mathquill/build/mathquill.css'
import { KeyAction, Actions, Keys } from './data/Keys'
import ErrorManager from './paper/ErrorManager'
import suggest from './paper/Suggest'
import math from './paper/MathQuill'
import Screen from './commons/Screen'
import Keyboard from './commons/Keyboard'
import Input from './commons/Input'
import Error from './commons/Error'
import deleteAnswerMutation from '../graph/deleteAnswer'
import Simplifier from '../calculation/Simplifier';

const { getKeywords, getSolutionKeywords } = suggest
let errorManager = null
const Wrapper = styled.div`
  background: white;
  height: 100%;
  position: relative;
  min-height: 100%;
`

const Paper = styled.div`overflow: auto;`

const List = styled.div`
  margin: 10px;
  background: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.07), 0 3px 1px -2px rgba(0, 0, 0, 0.1),
    0 1px 5px 0 rgba(0, 0, 0, 0.06);
`

class PaperComponent extends Component {
  static propTypes = {
    submitSolutions: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
  }
  static loadedMethod = false
  static loadedMath = false
  static submiting = false
  state = {
    methods: [
      {
        text: '',
        id: uuid(),
        focus: true,
        error: false,
      },
    ],
    line: 0,
    submiting: false,
    keywords: [],
    hasChecker: false,
    isDone: false,
    solutionId: null,
    checked: false,
    startedAt: new Date(),
  }

  initial(problem) {
    if (problem) {
      errorManager = new ErrorManager(problem)
      const keywords = getKeywords(problem.latex)
      console.log('called', { keywords })
      if (problem.solutions.length > 0) {
        console.log(problem.latex)
        console.log(problem.solutions[0].answers)
      }
      const hasChecker = errorManager.hasChecker()
      this.setState({ hasChecker, keywords, checked: !hasChecker })
    }
  }

  // when done loading
  componentWillReceiveProps(nextProps){
    if (!nextProps.postQuery.loading && this.props.postQuery.loading) {
      this.initial(nextProps.postQuery.Post)
    }
  }

  componentWillMount() {
    document.addEventListener("keypress", this.handleKeyPress, false);
    document.addEventListener("keydown", this.handleKeydown, false)
  }

  componentWillUnmount() {
    math.reset()
  }

  componentDidMount() {
    const isLoadFromAnswer = this.loadMethod()
    this.initial(this.props.postQuery.Post)
    const { line } = this.state
    const { methods } = this.state
    const method = methods[line]
    // method.focus = true
    // math.focus(method.id)
    // if (isLoadFromAnswer) {
      setTimeout(this.onEditLoaded, 1000);
    // }
  }

  onEditLoaded = () => {
    const { methods, line } = this.state
    if (this.loadedMethod) {
      console.log('loaded solution')
      const length = methods.length
      methods.forEach((method, index) => {
        math.setLatex(method.id, method.text)
        console.log('loaded ', method.text)
        if (index === length - 1)
          this.loadedMethod = false
      })
    }

    if (!this.loadedMath) {
      const method = methods[line]
      if (!method) {
        return
      }
  
      method.focus = true
      
      math.focus(method.id)
      math.goRight(method.id)
    }
  }

  loadMethod() {
    const { location } = this.props
    if (!location) { return false }
    
    const { state } = location
    if (!state) { return false }

    const { solution } = state
    if (!solution) { return false }
    
    const { answers, id } = solution
    if (!answers) { return false }

    console.log('Edit method enabled')

    const methods = []
    const length = answers.length
    answers.forEach((answer, index) => {
      const { id, latex } = answer
      // math.typed(latex, this.state.methods[this.state.line].id)
      methods.push({
        text: latex,
        id,
        focus: length - 1 === index,
        error: false,
      })
    })

    
    this.loadedMethod = true
    this.setState({ solutionId: id, methods, line: length - 1, isDone: true, checked: true })
    return true
  }

  onInputTouch(i, event) {
    const { methods, line } = this.state
    const newMethod = methods[i]
    if (i !== line) {
      const oldMethod = methods[line]
      if (oldMethod) {
        oldMethod.focus = false
        newMethod.focus = true
        this.setState({ methods, line: i })
        math.focus(newMethod.id)
        math.blur(oldMethod.id)
      }
    }
    if (event.target.tagName === 'DIV') {
      math.goRight(newMethod.id)
      // console.log('go right')
    }
  }

  validatation(methods, problem, hasChecker) {
    let error = null
    if (this.submiting) {
      return null
    }

    this.submiting = true
    let latexMethod = methods.map(method => {
      let newMethod = method
      newMethod.text = math.getLaTeX(method.id)
      return newMethod
    })
    
    const filterMethods = methods.filter(m => m.text != '')
    
    const solutions = filterMethods.map((method) => {
      return method.text
    })
    

    if (solutions.length === 0) {
      error = 'no solution added'
      this.submiting = false
      return null
    }

    if (solutions.length === 1) {
      if (methods[0].text === '') {
        this.submiting = false
        error = 'no solution added'
        return null
      }
    }

    let isError = false
    if (hasChecker) {
      const corrects = errorManager.check(solutions)
      console.log('Error Detection', corrects)
      if (corrects) {
        latexMethod = filterMethods.map((method, i) => {
          let newMethod = method
          if (!corrects[i]) {
            newMethod.error = true
            isError = true
            error = `get error at ${method.text}`
          } else {
            newMethod.error = false
          }
          return newMethod
        })
      }
    }

    this.submiting = false
    return {
      latexMethod,
      error
    }
  }

  submitEdit(id) {
    this.setState({ submiting: true })
    const { methods, problem, hasChecker, solutionId } = this.state
    let result = this.validatation(methods, problem, hasChecker)
    
    if (!result) {
      console.log('error')
      return
    }

    const { latexMethod, error } = result

    if (error) {
      this.setState({ methods: latexMethod, submiting: false })
      console.log(error)
      return
    }
    const answers = latexMethod.map(method => ({ latex: method.text, text: '' }))
    
    const { location } = this.props
    if (!location) { return }
    
    const { state } = location
    if (!state) { return }

    const { solution } = state
    if (!solution) { return }
    
    const answerToDelete = solution.answers
    if (!answerToDelete) { return }

    console.log(answers)
    if (solutionId) {
      const variables = {
        solutionId,
        answers,
      }
      deleteAnswerMutation(answerToDelete, this.props.deleteAnswer)
        .then(res => {
          this.props
            .updateSolution({ variables })
            .then((res) => {
              console.log(res)
              this.setState({ submiting: false })
              if (id) {
                this.props.history.replace('/answer', { id })
              } else {
                console.error('id is null')
              }
            })
            .catch((error) => {
              console.error(error)
              this.setState({ submiting: false })
              alert(error)
            })
        })
        .catch(error => {
          this.setState({ submiting: false })
          console.error(error)
        })
      
    }
  }

  onCheck(id) {
    const { methods, problem, hasChecker } = this.state
    let result = this.validatation(methods, problem, hasChecker)
    
    if (!result) {
      console.log('error')
      return
    }

    const { latexMethod, error } = result

    if (error) {
      this.setState({ methods: latexMethod, checked: false })
      console.log(error)
      return
    }

    this.setState({ checked: true })
  }

  submitAnswer(id) {
    this.setState({ submiting: true })
    const { methods, problem, hasChecker, startedAt } = this.state
    let result = this.validatation(methods, problem, hasChecker)
    
    if (!result) {
      console.log('error')
      this.setState({ submiting: false })
      return
    }
    
    const { latexMethod, error } = result

    if (error) {
      this.setState({ methods: latexMethod, submiting: false })
      console.log(error)
      return
    }
    const answers = latexMethod.map(method => ({ latex: method.text, text: '' }))
    console.log(answers)
    const { user } = this.props.data
    console.log(user)
    if (user) {
      const variables = {
        postId: id,
        userId: user.id,
        answers,
        startedAt,
      }

      const newUserExp = {
        id: user.id,
        experience: user.experience + 100,
        credit: user.credit + 10,
      }

      this.props.submitSolutions({ variables })
        .then((res) => {
          console.log(res)
          this.props.updateExperience({ variables: newUserExp })
            .then(userRes => {
              this.setState({ submiting: false })
              if (id) {
                this.props.history.replace('/answer', { id })
              } else {
                console.error('id is null')
              }
            })
        })
        .catch((error) => {
          console.error(error)
          this.setState({ submiting: false })
          alert(error)
        })
    }
    else {
      alert('No User Logged In')
      this.setState({ submiting: false })
    }
  }

  handleSuggestion(value) {
    const id = this.state.methods[this.state.line].id
    math.typed(value, id)
    math.typed(Keys.RIGHT, id)
  }

  handleKeyboard(value) {
    return new Promise((resolve, reject) => {
      this.loadedMath = true
      const methodCurrent = this.state.methods[this.state.line]
      if (!methodCurrent) {
        reject('cant get current method')
      }
      math.typed(value, methodCurrent.id)
      const action = KeyAction(value)
      let checked = true
      if (this.state.hasChecker) {
        checked = false
      }
      if (action === Actions.NEWLINE) {
        if (this.state.methods.length > 9) {
          reject('line is more than 9')
        }
        const { methods, keywords } = this.state
        const latex = math.getLaTeX(methods[this.state.line].id)
        if (latex) {
          const newKeywords = getSolutionKeywords(latex, keywords)
          const method = {
            test: '',
            id: uuid(),
            focus: true,
            error: false,
          }
          const { line } = this.state
          methods[line].focus = false
          methods.splice(line + 1, 0, method)
          this.loadedMath = false
          this.setState({ methods, line: line + 1, checked, keywords: newKeywords }, () => {
            math.focus(method.id)
            resolve(method.id)
          })
        }
      } else if (action === Actions.CLEAR) {
        let { methods } = this.state
        if (methods.length <= 1) {
          resolve()
        }
        const { line } = this.state
        methods = methods.filter((item, index) => index !== line)
        this.setState({
          methods,
          line: line > 0 ? line - 1 : line,
          checked
        }, () => {
          resolve(methods)
        })
      } else if (action === Actions.DELETE) {
        console.log('clear all')
        let { methods } = this.state      
        let method = methods[this.state.line]
        method.text = ''
        math.setLatex(method.id, '')
        this.setState({ methods }, () => {
          resolve(methods)
        })
      } else {
        const methods = this.state.methods.map((method) => {
          const methodReset = method
          methodReset.error = false
          return methodReset
        })
        this.setState({ methods, checked }, () => {
          resolve(methods)
        })
      }
    })
  }

  handleKeydown = (event) => {
    const { key } = event
    if (key === 'Backspace') {
      this.handleKeyboard(Keys.BACKSPACE)
      event.preventDefault();
    } else if (key === 'ArrowRight') {
      this.handleKeyboard(Keys.RIGHT)
    } else if (key === 'ArrowLeft') {
      this.handleKeyboard(Keys.LEFT)
    }
  }

  handleKeyPress = (event) => {
    if (event.key === '/') {
      event.preventDefault()
    }
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') {
      console.log('type ' + event.key)
      this.handleKeyboard(event.key)
        .then(res => console.log(res))
        .catch(error => console.error(error))
    }
  }

  onSimplify = (index) => {
    const { methods, line } = this.state
    const method = methods[index]
    const id = method.id
    const latex = math.getLaTeX(id)
    if (latex === null) {
      return
    }

    const simplified = Simplifier(latex)
    console.log(latex, methods)
    if (simplified !== null && simplified !== latex) {
      this.handleKeyboard(Keys.ENTER)
        .then(() => {
          const newMethod = methods[line+1]
          console.log(newMethod)
          if (newMethod) {
            console.log(simplified)
            math.setLatex(newMethod.id, simplified)
          }
        })
    }
  }

  render() {
    const data = this.props.postQuery
    if (data.loading) {
      return <Error message="Loading..." />
    }
    else if (data.error) {
      return <Error message={data.error} />
    }
    const problem = data.Post
    const { length } = this.state.methods
    const itemSize = 40
    if (problem) {
      const { submiting, keywords, isDone, checked } = this.state
      const { latex, image, description, id, tags } = problem
      const tagNames = tags.map(tag => tag.name)
      let imageUrl = null
      if (image) { imageUrl = image.url }
      return (
        <div>
          <Wrapper>
            <Paper>
              {/* {<Screen displayText={'\\frac{5x+4}{5}=3x'} onSubmit={() => this.submitAnswer('x=0.4')} />} */}
              <Screen
                displayText={latex || ''}
                description={description}
                imageUrl={imageUrl}
                id={id}
                done={isDone}
                loading={submiting}
                checked={checked}
                tags={tagNames}
                onSubmit={() => this.submitAnswer(id)}
                onEditSubmit={() => this.submitEdit(id)}
                onCheck={() => this.onCheck(id)}
              />
              <VirtualList
                width="100%"
                height={350}
                itemCount={length}
                itemSize={itemSize} // Also supports variable heights (array or function getter)
                renderItem={({ index }) => (
                  <List
                    onClick={(event) => this.onInputTouch(index, event)}
                    key={this.state.methods[index].id}
                  >
                    <Input
                      focus={this.state.methods[index].focus}
                      id={this.state.methods[index].id}
                      error={this.state.methods[index].error}
                      canSimplify={true}
                      simplify={() => this.onSimplify(index)}
                    />
                  </List>
                )}
              />
            </Paper>
          </Wrapper>
          <Keyboard
            onPress={key => this.handleKeyboard(key)}
            onSuggestionPress={key => this.handleSuggestion(key)}
            keywords={keywords}
          />
        </div>
      )
    }
    return <Error message="Not Found" />
  }
}

const submitSolutions = gql`
  mutation($answers: [SolutionanswersAnswer!]!, $postId: ID!, $userId: ID!, $startedAt: DateTime!) {
    createSolution(
      rateCount: 0
      authorId: $userId
      postId: $postId
      answers: $answers
      startedAt: $startedAt
    ) {
      id
    }
  }
`

const updateExperience = gql`
  mutation($id: ID!, $experience: Int!, $credit: Int!) {
    updateUser(
      id: $id,
      experience: $experience,
      credit: $credit
    ) {
      experience
      credit
    }
  }
`

const updateSolution = gql`
  mutation($answers: [SolutionanswersAnswer!]!, $solutionId: ID!) {
    updateSolution(
      id: $solutionId
      answers: $answers
    ) {
      id
    }
  }
`

const userQuery = gql`
  query {
    user {
      id
      experience
      credit
    }
  }
`

const postQuery = gql`
  query($id: ID!, $userId: ID) {
    Post(id: $id) {
      id
      latex
      description
      image {
        url
      }
      tags {
        name
      }
      solutions(filter: {
        author: {
          id: $userId
        }
      }) {
        id
        answers {
          latex
        }
      }
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

const PaperWithUpdateExp = graphql(updateExperience, { name: 'updateExperience' })(PaperComponent)

const PaperWithMutation = graphql(submitSolutions, { name: 'submitSolutions' })(PaperWithUpdateExp)

const PaperWithData = graphql(userQuery, {
  options: { fetchPolicy: 'network-only' },
})(PaperWithMutation)

const PaperWithPost = graphql(postQuery, {
  name: 'postQuery',
  options: ownProps => ({ variables: { id: ownProps.match.params.id, userId: "cj99we2yqkeh30166ddgr9h97" } })
})(PaperWithData)

const PaperWithDeleteAnswer = graphql(deleteAnswer, { name: 'deleteAnswer' })(PaperWithPost)

const PaperWithUpdateSolution = graphql(updateSolution, { name: 'updateSolution' })(PaperWithDeleteAnswer)

export default withRouter(PaperWithUpdateSolution)
