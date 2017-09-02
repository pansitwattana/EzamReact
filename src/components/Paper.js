import React, { Component } from 'react'
import styled from 'styled-components'
import VirtualList from 'react-tiny-virtual-list';
import uuid from 'uuid'
import { KeyAction, Actions } from './data/Keys'
import math from './paper/MathQuill'
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
`

const List = styled.div`
  margin: 10px;
  background: #FFF;
  border-radius: 2px;
  box-shadow:
    0 2px 2px 0 rgba(0,0,0,.14),
    0 3px 1px -2px rgba(0,0,0,.2),
    0 1px 5px 0 rgba(0,0,0,.12);
`

class PaperComponent extends Component {
  state = {
    methods: [{ text: '', id: uuid() }],
    line: 0,
  }

  componentDidMount() {
    console.log('did mount')
    math.focus(this.state.methods[this.state.line].id)
  }

  componentDidUpdate() {
    console.log('did update')
    math.focus(this.state.methods[this.state.line].id)
  }

  onInputTouch(index) {
    console.log(index)
    math.blur(this.state.methods[this.state.line].id)
    this.setState({ line: index })
  }

  handleKeyboard(value) {
    console.log(value, 'is pressed')
    math.typed(value, this.state.methods[this.state.line].id)
    if (KeyAction(value) === Actions.NEWLINE) {
      const methods = this.state.methods
      const method = { test: '', id: uuid() }
      methods.push(method)
      this.setState({ methods, line: this.state.line + 1 })
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
              height={600}
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
        <Keyboard onPress={value => this.handleKeyboard(value)} />
      </div>
    )
  }
}


export default PaperComponent
