import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Button } from 'semantic-ui-react'
import LaTeX from './LaTeX'
import Key from './Key'
import { Math, Alphabet } from '../data/Keyboards'
import { Keys, KeyAction, Actions } from '../data/Keys'

const Keyboard = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: ${props => props.height}%;
  box-shadow: 
    10px 10px 10px 10px rgba(0, 0, 0, 0.25), 
    0 3px 1px -2px rgba(0, 0, 0, 0.2),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
`

const KeyboardRow = styled.div`
  display: table;
  background-color: #db8a8a;
  width: 100%;
  height: ${props => props.height}%;
`

const Suggestion = styled.div`
  height: 15px
  width: 100%
`
class KeyboardComponent extends Component {
  state = {
    type: Math,
  }
  onKeywordPress = (e) => {
    const mathfield = e.target.firstChild
    // console.log(mathfield)
    if (mathfield) {
      const latex = mathfield.id
      if (latex) {
        this.props.onPress(latex)
      }
    }
  }

  handleKeyPress = (value) => {
    const action = KeyAction(value)
    if (action === Actions.ALPHABET) {
      this.setState({ type: Alphabet })
    } else if (action === Actions.NUMBER) {
      this.setState({ type: Math })
    } else {
      this.props.onPress(value)
    }
  }
  renderKeywords(keywords, height) {
    return keywords.map(keyword => (
      <Button key={keyword.id} onClick={this.onKeywordPress} style={{ height }}>
        <LaTeX text={keyword.value} id={keyword.value} />
      </Button>))
  }

  render() {
    if (!this.props.show) {
      return (
        <div />
      )
    }

    const { keywords } = this.props
    let suggestionComponent = <div />
    let keyHeight = 75
    let keyActionHeight = 15
    const keySuggestionHeight = '10%'
    if (keywords && keywords.length > 0) {
      keyHeight = 75
      keyActionHeight = 15
      suggestionComponent = (<Suggestion>{this.renderKeywords(keywords, keySuggestionHeight)}</Suggestion>)
    } else {
      keyHeight = 85
      keyActionHeight = 15
    }

    const {
      value, symbol, down, up, action,
    } = this.state.type
    const rowCount = symbol.length
    const height = (9 * value.length)
    const keyboardRows = value.map((values, row) => {
      const symbolRow = symbol[row]
      const downRow = down[row]
      const upRow = up[row]
      const col = symbolRow.length
      let key = ''
      const keys = values.map((keyValue, index) => {
        const symbolValue = symbolRow[index]
        const downValue = downRow[index]
        const upValue = upRow[index]
        key += symbolValue
        return (
          <Key
            key={symbolValue}
            keyType="number"
            keyValue={keyValue}
            keySymbol={symbolValue}
            swipeDown={downValue}
            swipeUp={upValue}
            onPress={this.handleKeyPress}
            colCount={col}
          />)
      })
      const rowHeight = keyHeight / rowCount
      return <KeyboardRow key={key} height={rowHeight} >{keys}</KeyboardRow>
    })
    return (
      <Keyboard height={height}>
        {suggestionComponent}
        {keyboardRows}
        <KeyboardRow height={keyActionHeight}>
          <Key keyType="operator" keyValue={action} keySymbol={action} onPress={this.handleKeyPress} swipeDown={action} />
          <Key keyType="operator" keyValue={Keys.LEFT} keySymbol="←" onPress={this.handleKeyPress} swipeDown={Keys.LEFT} />
          <Key keyType="operator" keyValue={Keys.RIGHT} keySymbol="→" onPress={this.handleKeyPress} swipeDown={Keys.RIGHT} />
          <Key keyType="operator" keyValue={Keys.ENTER} keySymbol="↵" onPress={this.handleKeyPress} swipeDown={Keys.ENTER} />
        </KeyboardRow>
      </Keyboard>
    )
  }
}

// const KeyboardComponent = ({ onPress, keyValues, keySymbols, swipeDownValue, action }) => {
//   const rowCount = keySymbols.length
//   const height = (9 * keyValues.length)
//   const keyboardRows = keyValues.map((values, row) => {
//     const symbolRow = keySymbols[row]
//     const downRow = swipeDownValue[row]
//     const col = symbolRow.length
//     let key = ''
//     const keys = values.map((value, index) => {
//       const symbol = symbolRow[index]
//       const downValue = downRow[index]
//       key += symbol
//       return (
//         <Key
//           key={symbol}
//           keyType="number"
//           keyValue={value}
//           keySymbol={symbol}
//           swipeDown={downValue}
//           onPress={onPress}
//           colCount={col}
//         />)
//     })
//     const rowHeight = 80 / rowCount
//     return <KeyboardRow key={key} height={rowHeight} >{keys}</KeyboardRow>
//   })
//   return (
//     <Keyboard height={height}>
//       {keyboardRows}
//       <KeyboardRow height={'20'}  >
//         <Key keyType="operator" keyValue={action} keySymbol={action} onPress={onPress} swipeDown={action} />
//         <Key keyType="operator" keyValue={Keys.LEFT} keySymbol="←" onPress={onPress} swipeDown={Keys.LEFT} />
//         <Key keyType="operator" keyValue={Keys.RIGHT} keySymbol="→" onPress={onPress} swipeDown={Keys.RIGHT} />
//         <Key keyType="operator" keyValue={Keys.ENTER} keySymbol="↵" onPress={onPress} swipeDown={Keys.ENTER} />
//       </KeyboardRow>
//     </Keyboard>
//   )
// }

const KeyboardType = {
  MATH: 'MATH',
  ALPHABET: 'ALPHABET',
}

KeyboardComponent.defaultProps = {
  show: true,
  keywords: [],
}

KeyboardComponent.propTypes = {
  onPress: PropTypes.func.isRequired,
  keywords: PropTypes.array,
  show: PropTypes.bool,
}

export default KeyboardComponent
export { KeyboardType }
