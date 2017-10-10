import React, { Component } from 'react'
import styled from 'styled-components'
import VirtualList from 'react-tiny-virtual-list'
import uuid from 'uuid'
import AlgebraLatex from 'algebra-latex'
import algebrite from 'algebrite'
import 'mathquill/build/mathquill.css'
import { KeyAction, Actions } from './data/Keys'
import math from './paper/MathQuill'
import Screen from './commons/Screen'
import Keyboard from './commons/Keyboard'
import Input from './commons/Input'
import { Math, Alphabet } from './data/Keyboards'

const Wrapper = styled.div`
  background: white;
  height: 100%;
  position: relative;
  min-height: 100%;
`

const Paper = styled.div`
  overflow: auto;
`

const List = styled.div`
  margin: 10px;
  background: #FFF;
  border-radius: 2px;
  box-shadow:
    0 2px 2px 0 rgba(0,0,0,.07),
    0 3px 1px -2px rgba(0,0,0,.1),
    0 1px 5px 0 rgba(0,0,0,.06);
`

class PaperComponent extends Component {
  state = {
    problem: null,
    methods: [{ text: '', id: uuid(), focus: true }],
    line: 0,
    keyboard: Math,
  }

  componentWillMount() {
    console.log(this.props.location)
    const location = this.props.location
    if (!location) return;
    const state = location.state
    if (!state) return;
    const data = state.data
    if (!data) return;

    this.setState({ problem: data })
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

  handleKeyPress = (event) => {
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
      if (this.state.methods.length > 9) { return; }
      const methods = this.state.methods
      const latex = math.getLaTeX(methods[this.state.line].id)
      if (latex) {
        const method = { test: '', id: uuid(), focus: true }
        const line = this.state.line
        methods[line].focus = false
        methods.splice(line + 1, 0, method);
        this.setState({ methods, line: line + 1 })
      }
    } else if (action === Actions.CLEAR) {
      let methods = this.state.methods
      if (methods.length <= 1) {
        return;
      }
      const line = this.state.line
      methods = methods.filter((item, index) => index !== line)
      this.setState({
        methods,
        line: line > 0 ? line - 1 : line,
      })
    } else if (action === Actions.ALPHABET) {
      this.setState({ keyboard: Alphabet })
    } else if (action === Actions.NUMBER) {
      this.setState({ keyboard: Math })
    }
  }

  submitAnswer(ans) {
    const methods = this.state.methods
    const equations = []
    methods.forEach((method) => {
      const equation = math.getLaTeX(method.id)
      const algebraObj = new AlgebraLatex(equation)
      algebraObj.toAlgebrite(algebrite)
      const mathAnswer = algebraObj.toMath()
      console.log(mathAnswer)
      const answer = algebrite.run(mathAnswer)
      console.log(answer)
      equations.push(equation)
    })
    console.log(equations[equations.length - 1] === ans)
    console.log(equations)
  }

  render() {
    const { symbol, value, action } = this.state.keyboard
    const length = this.state.methods.length
    const itemSize = 40
    if (this.state.problem) {
      const { detail, id } = this.state.problem
      return (
        <div>
          <Wrapper onKeyDown={this.handleKeyPress} tabIndex="0">
            <Paper>
              {<Screen displayText={'\\frac{5x+4}{5} = 3x'} onSubmit={() => this.submitAnswer('x=0.4')} />}
              {/* <Screen displayText={detail} onSubmit={() => this.submitAnswer(id)} /> */}
              <VirtualList
                width="100%"
                height={350}
                itemCount={length}
                itemSize={itemSize} // Also supports variable heights (array or function getter)
                renderItem={({ index }) =>
                  (<List onClick={() => this.onInputTouch(index)} key={this.state.methods[index].id}>
                    <Input focus={this.state.methods[index].focus} id={this.state.methods[index].id} />
                  </List>)
                }
              />
            </Paper>
          </Wrapper>
          <Keyboard keySymbols={symbol} keyValues={value} action={action} onPress={key => this.handleKeyboard(key)} />
        </div>
      )
    }
    return (
      <div>
        404 Not Found
      </div>
    )
  }
}

export default PaperComponent
