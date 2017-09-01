import React, { Component } from 'react'
import styled from 'styled-components'
import uuid from 'uuid'
import { typed } from './paper/MathQuill'
import 'mathquill/build/mathquill.css'
import Screen from './commons/Screen'
import Keyboard from './commons/Keyboard'
import Input from './commons/Input'

const Wrapper = styled.div`
  background: white;
  height: 100%;
  position: relative;
  min-height: 100%;
`

const Paper = styled.div`
  overflow: auto;
  padding-bottom: 480px;
`

class PaperComponent extends Component {
  state = {
    methods: [
      {
        text: '',
        id: uuid(),
      },
    ],
    line: 0,
  }

  handleKeyboard(value) {
    console.log(value, 'is pressed')
    typed(value, this.state.methods[this.state.line].id)
  }

  renderInput() {
    return this.state.methods.map((method) => {
      return <Input key={method.id} id={method.id} />
    })
  }

  render() {
    return (
      <div>
        <Wrapper>
          <Paper>
            <Screen displayText={'10^2+5x=7'} />
            {this.renderInput()}
          </Paper>
        </Wrapper>
        <Keyboard onPress={value => this.handleKeyboard(value)} />
      </div>
    )
  }
}


export default PaperComponent
