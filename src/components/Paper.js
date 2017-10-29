import React, { Component } from 'react'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'
import { gql, graphql } from 'react-apollo'
import VirtualList from 'react-tiny-virtual-list'
import PropTypes from 'prop-types'
import uuid from 'uuid'
import 'mathquill/build/mathquill.css'
import { KeyAction, Actions } from './data/Keys'
import solver from './paper/Solver'
import math from './paper/MathQuill'
import Screen from './commons/Screen'
import Keyboard from './commons/Keyboard'
import Input from './commons/Input'
import Error from './commons/Error'
import { Math, Alphabet } from './data/Keyboards'

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
  }

  state = {
    problem: null,
    done: false,
    methods: [{ text: '', id: uuid(), focus: true, error: false }],
    line: 0,
    keyboard: Math
  }

  componentWillMount() {
    // console.log(this.props.location)
    const location = this.props.location
    if (!location) return
    const data = location.state.post
    const done = location.state.done
    if (data) this.setState({ problem: data, done })
  }

  componentDidMount() {
    const line = this.state.line
    const methods = this.state.methods
    const method = methods[line]
    method.focus = true
    math.focus(method.id)
  }

  componentDidUpdate() {
    const line = this.state.line
    const methods = this.state.methods
    const method = methods[line]
    method.focus = true
    math.focus(method.id)
  }

  onInputTouch(line) {
    const methods = this.state.methods
    const oldMethod = methods[this.state.line]
    oldMethod.focus = false
    const newMethod = methods[line]
    newMethod.focus = true
    this.setState({ methods, line })
    math.blur(oldMethod.id)
  }

  handleKeyPress = event => {
    console.log(event.key)
    // if (event.key === 'Enter') {
    //   console.log('enter press here! ')
    //   this.state.methods.forEach((value) => {
    //     console.log(math.getLaTeX(value.id))
    //   })
    // }
    this.handleKeyboard(event.key)
  }

  handleKeyboard(value) {
    math.typed(value, this.state.methods[this.state.line].id)
    const action = KeyAction(value)
    if (action === Actions.NEWLINE) {
      if (this.state.methods.length > 9) {
        return
      }
      const methods = this.state.methods
      const latex = math.getLaTeX(methods[this.state.line].id)
      if (latex) {
        const method = { test: '', id: uuid(), focus: true, error: false }
        const line = this.state.line
        methods[line].focus = false
        methods.splice(line + 1, 0, method)
        this.setState({ methods, line: line + 1 })
      }
    } else if (action === Actions.CLEAR) {
      let methods = this.state.methods
      if (methods.length <= 1) {
        return
      }
      const line = this.state.line
      methods = methods.filter((item, index) => index !== line)
      this.setState({
        methods,
        line: line > 0 ? line - 1 : line
      })
    } else if (action === Actions.ALPHABET) {
      this.setState({ keyboard: Alphabet })
    } else if (action === Actions.NUMBER) {
      this.setState({ keyboard: Math })
    } else {
      const methods = this.state.methods.map(method => {
        const methodReset = method
        methodReset.error = false
        return methodReset
      })
      this.setState({ methods })
    }
  }

  submitAnswer() {
    
    const problem = this.state.problem
    let methods = this.state.methods

    if (methods.length === 0) {
      console.log('no solution added')
      return
    }

    const answer = solver(problem.latex)
    const equations = []
    let alreadyCheck = false
    methods = methods.map(method => {
      const newMethod = method
      const equation = math.getLaTeX(method.id)
      newMethod.text = equation
      const x = solver(equation)
      if (answer !== false && alreadyCheck === false && x !== answer) {
        newMethod.error = true
        alreadyCheck = true
        console.log(equation, ' not correct')
        console.log(x, ' is not equal ', answer)
      } else {
        newMethod.error = false
      }
      equations.push(equation)
      return newMethod
    })
    console.log(methods)
    this.setState({ methods })

    const answers = methods.map(method => ({ latex: method.text, text: '',}))
    console.log(answers)
    const user = this.props.data.user
    if (this.props.data.user) {
      const variables = {
        postId: problem.id,
        userId: user.id,
        answers: answers
      }
      this.props.submitSolutions({ variables })
        .then((res) => {
          console.log(res)
          this.props.history.push('/answer', problem.id)
        })
        .catch((error) => {
          console.log(error)
        })
    }
    else {
      console.log('please log in before submit solution')
    }

    // console.log(equations[equations.length - 1] === ans)
    // console.log(equations)
  }

  onShowAnswers(id) {
    this.props.history.push('/answer', id)
  }

  render() {
    const { symbol, value, downValue, action } = this.state.keyboard
    const length = this.state.methods.length
    const itemSize = 40
    if (this.state.problem) {
      const { latex, id } = this.state.problem
      const isDone = this.state.done
      return (
        <div>
          <Wrapper onKeyDown={this.handleKeyPress} tabIndex="0">
            <Paper>
              {/* {<Screen displayText={'\\frac{5x+4}{5}=3x'} onSubmit={() => this.submitAnswer('x=0.4')} />} */}
              <Screen
                displayText={latex}
                id={id}
                done={isDone}
                onSubmit={() => this.submitAnswer()}
                onShowAnswers={() => this.showAnswer(id)}
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
            keySymbols={symbol}
            keyValues={value}
            swipeDownValue={downValue}
            action={action}
            onPress={key => this.handleKeyboard(key)}
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

const PaperWithMutation = graphql(submitSolutions, { name: 'submitSolutions' })(PaperComponent)

const PaperWithData = graphql(userQuery, {
  options: { fetchPolicy: 'network-only' }
})(PaperWithMutation)

export default (withRouter(PaperWithData))
