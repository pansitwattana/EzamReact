import React, { Component } from 'react'
import styled from 'styled-components'
import Screen from './commons/Screen'
import Keyboard from './commons/Keyboard'

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
    methods: [{
      text: ''
    }]
  }

  renderInput() {
    return <span />
  }

  handleKeyboard(value) {
    console.log(value)
    input(value)
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
        <Keyboard onPress={this.handleKeyboard} />
      </div>
    )
  }
}

let mathFieldSpan = document.getElementById('math-field');
let MQ = window.MathQuill.getInterface(2);
let mathField = MQ.MathField(mathFieldSpan, {
  spaceBehavesLikeTab: true,
  handlers: {
    edit() {
      this.focus();
    },
  },
});

function input(str) {
  if (mathField) {
    mathField.cmd(str);
    mathField.focus();
  } else {
    mathFieldSpan = document.getElementById('math-field');
    MQ = window.MathQuill.getInterface(2);
    mathField = MQ.MathField(mathFieldSpan);
    mathField.cmd(str);
    mathField.focus();
  }
}

export default PaperComponent
