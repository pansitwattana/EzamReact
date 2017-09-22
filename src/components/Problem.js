import React, { Component } from 'react'
import uuid from 'uuid'
import { Math } from './data/Keyboards'
import math from './paper/MathQuill'
import Keyboard from './commons/Keyboard'
import styled from 'styled-components'
import Input from './commons/Input'
import Header from './commons/Header'

const Question = styled.div`
  margin: 10px;
  height: 100px;
  background: #FFF;
  border-radius: 2px;
  box-shadow:
    0 2px 2px 0 rgba(0,0,0,.07),
    0 3px 1px -2px rgba(0,0,0,.1),
    0 1px 5px 0 rgba(0,0,0,.06);
`

class Problem extends Component {
  state = {
    problemId: uuid(),
    solutionId: uuid(),
  }

  componentWillMount() {
    console.log('will mount')
  }

  handleKeyboard(key) {
    math.typed(key, this.state.problemId)
  }

  render() {
    const { symbol, value, action } = Math
    return (
      <div>
        <Header text="Add Problem" />
        <Question>
          <Input id={this.state.problemId} />
        </Question>
        <Header text="Add Solution" />
        <Question>
          <Input id={this.state.solutionId} />
        </Question>
        <Keyboard keySymbols={symbol} keyValues={value} action={action} onPress={key => this.handleKeyboard(key)} />
      </div>
    )
  }
}

export default Problem
