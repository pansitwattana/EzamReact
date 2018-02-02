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

const { getKeywords } = suggest
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
  }

  initial(problem) {
    if (problem) {
      errorManager = new ErrorManager(problem)
      const keywords = getKeywords(problem.latex)
      console.log('called', { keywords, problem })
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

  componentWillUnmount() {
    math.reset()
  }

  componentDidMount() {
    this.loadMethod()
    this.initial(this.props.postQuery.Post)
    const { line } = this.state
    const { methods } = this.state
    const method = methods[line]
    method.focus = true
    math.focus(method.id)
  }

  componentDidUpdate() {
    const { line, methods, loadMethod } = this.state
    if (this.loadedMethod) {
      console.log('loaded solution')
      const length = methods.lastIndexOf
      methods.forEach((method, index) => {
        math.setLatex(method.id, method.text)
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
    }
  }

  loadMethod() {
    const { location } = this.props
    if (!location) { return }
    
    const { state } = location
    if (!state) { return }

    const { solution } = state
    if (!solution) { return }
    
    const { answers, id } = solution
    if (!answers) { return }

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
    this.setState({ solutionId: id, methods, line: length - 1, isDone: true, checked: true }, () => {
      // methods.forEach(method => {
      //   math.setLatex(method.id, method.text)
      // })
    })
  }

  onInputTouch(i, event) {
    const { methods, line } = this.state
    const newMethod = methods[i]
    if (i !== line) {
      const oldMethod = methods[line]
      oldMethod.focus = false
      newMethod.focus = true
      this.setState({ methods, line: i })
      math.focus(newMethod.id)
      math.blur(oldMethod.id)
    }
    if (event.target.tagName === 'DIV') {
      math.goRight(newMethod.id)
      console.log('go right')
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
      if (corrects) {
        latexMethod = filterMethods.map((method, i) => {
          let newMethod = method
          if (!corrects[i]) {
            newMethod.error = true
            isError = true
            error = `get error at ${method.text}`
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
    const { methods, problem, hasChecker } = this.state
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
    console.log(answers)
    const { user } = this.props.data
    if (user) {
      const variables = {
        postId: id,
        userId: user.id,
        answers,
      }

      this.props
        .submitSolutions({ variables })
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
    }
  }

  handleSuggestion(value) {
    const id = this.state.methods[this.state.line].id
    math.typed(value, id)
    math.typed(Keys.RIGHT, id)
  }

  handleKeyboard(value) {
    this.loadedMath = true
    math.typed(value, this.state.methods[this.state.line].id)
    const action = KeyAction(value)
    let checked = true
    if (this.state.hasChecker) {
      checked = false
    }
    if (action === Actions.NEWLINE) {
      if (this.state.methods.length > 9) {
        return
      }
      const { methods } = this.state
      const latex = math.getLaTeX(methods[this.state.line].id)
      if (latex) {
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
        this.setState({ methods, line: line + 1, checked })
      }
    } else if (action === Actions.CLEAR) {
      let { methods } = this.state
      if (methods.length <= 1) {
        return
      }
      const { line } = this.state
      methods = methods.filter((item, index) => index !== line)
      this.setState({
        methods,
        line: line > 0 ? line - 1 : line,
        checked
      })
    } else {
      const methods = this.state.methods.map((method) => {
        const methodReset = method
        methodReset.error = false
        return methodReset
      })
      this.setState({ methods, checked })
    }
  }

  handleKeyPress = (event) => {
    console.log(event)
    // if (event.key === 'Enter') {
    //   console.log('enter press here! ')
    //   this.state.methods.forEach((value) => {
    //     console.log(math.getLaTeX(value.id))
    //   })
    // }
    this.handleKeyboard(event.key)
  }

  onSimplify = (index) => {
    const method = this.state.methods[index]
    const id = method.id
    const latex = math.getLaTeX(id)
    const simplified = Simplifier(latex)
    console.log(latex)
    if (simplified !== null) {
      console.log(simplified)
      math.setLatex(id, simplified)
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
      const { latex, image, description, id } = problem
      let imageUrl = null
      if (image) { imageUrl = image.url }
      return (
        <div onKeyPress={this.handleKeyPress} tabIndex="0">
          <Wrapper>
            <Paper>
              {/* {<Screen displayText={'\\frac{5x+4}{5}=3x'} onSubmit={() => this.submitAnswer('x=0.4')} />} */}
              <Screen
                displayText={latex}
                description={description}
                imageUrl={imageUrl}
                id={id}
                done={isDone}
                loading={submiting}
                checked={checked}
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
  mutation($answers: [SolutionanswersAnswer!]!, $postId: ID!, $userId: ID!) {
    createSolution(
      rateCount: 0
      authorId: $userId
      postId: $postId
      answers: $answers
    ) {
      id
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
    }
  }
`

const postQuery = gql`
  query($id: ID!) {
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

const PaperWithMutation = graphql(submitSolutions, { name: 'submitSolutions' })(PaperComponent)

const PaperWithData = graphql(userQuery, {
  options: { fetchPolicy: 'network-only' },
})(PaperWithMutation)

const PaperWithPost = graphql(postQuery, { 
  name: 'postQuery',
  options: ownProps => ({ variables: { id: ownProps.match.params.id } })
})(PaperWithData)

const PaperWithDeleteAnswer = graphql(deleteAnswer, { name: 'deleteAnswer' })(PaperWithPost)

const PaperWithUpdateSolution = graphql(updateSolution, { name: 'updateSolution' })(PaperWithDeleteAnswer)

export default withRouter(PaperWithUpdateSolution)
