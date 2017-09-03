import React, { Component } from 'react'
import styled from 'styled-components'
import VirtualList from 'react-tiny-virtual-list'
import uuid from 'uuid'
import 'mathquill/build/mathquill.css'
import { KeyAction, Actions } from './data/Keys'
import math from './paper/MathQuill'
import Screen from './commons/Screen'
import Keyboard, { KeyboardType } from './commons/Keyboard'
import Input from './commons/Input'
import { Math } from './data/Keyboards'


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
    methods: [{ text: '', id: uuid() }],
    line: 0,
    keyboard: KeyboardType.MATH,
  }

  componentDidMount() {
    math.focus(this.state.methods[this.state.line].id)
  }

  componentDidUpdate() {
    math.focus(this.state.methods[this.state.line].id)
  }

  onInputTouch(index) {
    math.blur(this.state.methods[this.state.line].id)
    this.setState({ line: index })
  }

  handleKeyboard(value) {
    math.typed(value, this.state.methods[this.state.line].id)
    const action = KeyAction(value)
    if (action === Actions.NEWLINE) {
      const methods = this.state.methods
      const latex = math.getLaTeX(methods[this.state.line].id)
      if (latex) {
        const method = { test: '', id: uuid() }
        methods.splice(this.state.line + 1, 0, method);
        this.setState({ methods, line: this.state.line + 1 })
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
    }
  }

  render() {
    return (
      <div>
        <Wrapper>
          <Paper>
            <Screen displayText={'10^2+5x=7'} />
            <VirtualList
              width="100%"
              height={300}
              itemCount={this.state.methods.length}
              itemSize={50} // Also supports variable heights (array or function getter)
              renderItem={({ index }) =>
                (<List onClick={() => this.onInputTouch(index)} key={this.state.methods[index].id}>
                  <Input id={this.state.methods[index].id} />
                </List>)
              }
            />
          </Paper>
        </Wrapper>
        <Keyboard keySymbols={Math.symbol} keyValues={Math.value} onPress={value => this.handleKeyboard(value)} />
      </div>
    )
  }
}


export default PaperComponent
