import React, { Component } from 'react'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'
import { gql, graphql } from 'react-apollo'
import VirtualList from 'react-tiny-virtual-list'
import PropTypes from 'prop-types'
import uuid from 'uuid'
import 'mathquill/build/mathquill.css'
import { KeyAction, Actions } from './data/Keys'
import ErrorManager from './paper/ErrorManager'
import suggest from './paper/Suggest'
import math from './paper/MathQuill'
import Screen from './commons/Screen'
import Keyboard from './commons/Keyboard'
import Input from './commons/Input'
import Error from './commons/Error'

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
  static loadMethod = false
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
  }

  // when done loading
  componentWillReceiveProps(nextProps){
    if (!nextProps.postQuery.loading && this.props.postQuery.loading) {
      const problem = nextProps.postQuery.Post
      if (problem) {
        console.log('called')
        errorManager = new ErrorManager(problem)
        const keywords = getKeywords(problem.latex)
        if (errorManager.hasChecker()) {
          this.setState({ hasChecker: true, keywords })
        }
      }
    }
  }

  componentWillUnmount() {
    math.reset()
  }

  componentDidMount() {
    const { line } = this.state
    const { methods } = this.state
    const method = methods[line]
    method.focus = true
    math.focus(method.id)
    this.loadMethod()
  }

  componentDidUpdate() {
    const { line, methods, loadMethod } = this.state
    if (this.loadMethod) {
      let isLoad = true
      methods.forEach(method => {
        isLoad = isLoad & math.typed(method.text, method.id)
      })
      if (isLoad)
        this.loadMethod = false
    }
    const method = methods[line]
    method.focus = true
    math.focus(method.id)
  }

  loadMethod() {
    const { location } = this.props
    if (!location) { return }
    
    const { state } = location
    if (!state) { return }

    const { solution } = state
    if (!solution) { return }
    
    const { answers } = solution
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
    this.loadMethod = true
    this.setState({ methods, line: length - 1 })
  }

  onInputTouch(line) {
    const { methods } = this.state
    const oldMethod = methods[this.state.line]
    oldMethod.focus = false
    const newMethod = methods[line]
    newMethod.focus = true
    this.setState({ methods, line })
    math.blur(oldMethod.id)
  }

  onShowAnswers(id) {
    this.props.history.push('/answer', {
      id,
    })
  }

  submitAnswer(id) {
    this.setState({ submiting: true })
    const { problem, hasChecker } = this.state
    let { methods } = this.state

    methods = methods.map(method => {
      let newMethod = method
      newMethod.text = math.getLaTeX(method.id)
      return newMethod
    })

    const solutions = methods.map((method) => {
      return method.text
    })
    if (solutions.length === 0) {
      alert('no solution added')
      this.setState({ submiting: false })
      return
    }
    
    if (solutions.length === 1) {
      if (methods[0].text === '') {
        this.setState({ submiting: false })
        alert('no solution added')
        return
      }
    }

    let isError = false
    if (hasChecker) {
      const corrects = errorManager.check(solutions)
      if (corrects) {
        console.log(corrects)
        methods = methods.map((method, i) => {
          let newMethod = method
          if (!corrects[i]) {
            newMethod.error = true
            isError = true
            console.log(`get error at ${method.text}`)
          }
          return newMethod
        })
      }
    }
    // const answer = solver(problem.latex)
    // const equations = []
    // let isError = false
    // let alreadyCheck = false
    // methods = methods.map((method) => {
    //   const newMethod = method
    //   const equation = math.getLaTeX(method.id)
    //   newMethod.text = equation
    //   const x = solver(equation)
    //   if (answer !== false && alreadyCheck === false && x !== answer) {
    //     newMethod.error = true
    //     isError = true
    //     alreadyCheck = true
    //     console.log(equation, ' not correct')
    //     console.log(x, ' is not equal ', answer)
    //   } else {
    //     newMethod.error = false
    //   }
    //   equations.push(equation)
    //   return newMethod
    // })
    // this.setState({ methods })

    if (!isError) {
      const answers = methods.map(method => ({ latex: method.text, text: '' }))
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
            this.setState({ submiting: false })
            console.error(error)
            alert(error)
          })
      } else {
        this.setState({ submiting: false })
        const error = 'please log in before submit solution'
        alert(error)
      }

      // console.log(equations[equations.length - 1] === ans)
      // console.log(equations)
    } else {
      this.setState({ methods, submiting: false })
    }
  }

  handleKeyboard(value) {
    math.typed(value, this.state.methods[this.state.line].id)
    const action = KeyAction(value)
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
        this.setState({ methods, line: line + 1 })
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
      })
    } else {
      const methods = this.state.methods.map((method) => {
        const methodReset = method
        methodReset.error = false
        return methodReset
      })
      this.setState({ methods })
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
      const { submiting, keywords } = this.state
      const { latex, imageurl, id } = problem
      return (
        <div onKeyPress={this.handleKeyPress} tabIndex="0">
          <Wrapper>
            <Paper>
              {/* {<Screen displayText={'\\frac{5x+4}{5}=3x'} onSubmit={() => this.submitAnswer('x=0.4')} />} */}
              <Screen
                displayText={latex}
                imageUrl={imageurl}
                id={id}
                done={false}
                loading={submiting}
                onSubmit={() => this.submitAnswer(id)}
                onShowAnswers={() => this.onShowAnswers(id)}
              />
              <VirtualList
                width="100%"
                height={350}
                itemCount={length}
                itemSize={itemSize} // Also supports variable heights (array or function getter)
                renderItem={({ index }) => (
                  <List
                    onClick={() => this.onInputTouch(index)}
                    key={this.state.methods[index].id}
                  >
                    <Input
                      focus={this.state.methods[index].focus}
                      id={this.state.methods[index].id}
                      error={this.state.methods[index].error}
                    />
                  </List>
                )}
              />
            </Paper>
          </Wrapper>
          <Keyboard
            onPress={key => this.handleKeyboard(key)}
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
      rate: 0
      rateCount: 0
      authorId: $userId
      postId: $postId
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
      imageurl
      tags {
        name
      }
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

export default withRouter(PaperWithPost)
