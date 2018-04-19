import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Button } from 'semantic-ui-react'
import LaTeX from './LaTeX'
import Key from './Key'
import { Math, Alphabet, MathJax, MathJaxAlphabet } from '../data/Keyboards'
import { Keys, KeyAction, Actions } from '../data/Keys'
import Label from './Keyboard/Label'

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
  height: 15%;
  width: 100%;
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
`

let containerHeight = 0

class KeyboardComponent extends Component {
  state = {
    type: Math,
    showLabel: false,
    labelPos: {
      x: 0,
      y: 0,
    },
    swipeStatus: {
      up: false,
      down: false
    },
    swipeValue: {
      swipeUp: '',
      swipeDown: '',
    }
  }

  onKeywordPress = (keyword) => {
    this.props.onSuggestionPress(keyword)
  }

  onKeyPress = (value) => {
  
  }

  handleKeyPress = (value) => {
    const action = KeyAction(value)
    const { type } = this.state
    if (action === Actions.ALPHABET && type === Math) {
      this.setState({ type: Alphabet, showLabel: false })
    } else if (action === Actions.NUMBER && type === Alphabet) {
      this.setState({ type: Math, showLabel: false })
    } else if (action === Actions.ALPHABET && type !== Math) {
      this.setState({ type: MathJaxAlphabet, showLabel: false })
    } else if (action === Actions.NUMBER && type !== Math) {
      this.setState({ type: MathJax, showLabel: false })
    } else {
      this.props.onPress(value)
    }
    this.setState({
      showLabel: false,
      swipeStatus: {
        up: false,
        down: false
      },
      swipeValue: {
        swipeUp: '',
        swipeDown: '',
      }
    })
  }

  handleClick = (pos, swipeValue) => {
    console.log({
      pos, containerHeight, swipeValue
    })
    const top = 100
    const left = 30
    const y = ((window.innerHeight) * containerHeight / 100) - (window.innerHeight - pos.y) - top
    const x = pos.x + left
    const newPos = { x, y }
    this.setState({ labelPos: newPos, showLabel: true, swipeValue })
  }

  handleSwipe = (swipeUp, swipeDown) => {
    console.log(swipeUp, swipeDown)
    this.setState({ swipeStatus: { swipeUp, swipeDown } })
  }
  
  renderKeywords(keywords) {
    return keywords.map(keyword => (
      <Button style={{ height: '100%', padding: '9px', margin: '2px' }} key={keyword.id} onClick={() => this.onKeywordPress(keyword.value)}>
        <LaTeX text={keyword.value} id={keyword.value} />
      </Button>))
  }

  componentWillMount() {
    const { isMathJax } = this.props
    if (isMathJax) {
      this.setState({ type: MathJax })
    }
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
    let keyActionHeight = 10
    if (keywords && keywords.length > 0) {
      keyHeight = 75
      keyActionHeight = 10
      suggestionComponent = (<Suggestion>{this.renderKeywords(keywords)}</Suggestion>)
    } else {
      keyHeight = 85
      keyActionHeight = 15
    }

    const { type, showLabel, labelPos, swipeValue, swipeStatus } = this.state
    const { x, y } = labelPos
    const {
      value, symbol, down, up, action, downSymbol, upSymbol
    } = type
    const rowCount = symbol.length
    const height = (6 * value.length) + 15
    containerHeight = height
    const keyboardRows = value.map((values, row) => {
      const symbolRow = symbol[row]
      const upSymbolRow = upSymbol[row]
      const downSymbolRow = downSymbol[row]
      const downRow = down[row]
      const upRow = up[row]
      const col = symbolRow.length
      let key = ''
      const keys = values.map((keyValue, index) => {
        const symbolValue = symbolRow[index]
        const upSymbolValue = upSymbolRow[index]
        const downSymbolValue = downSymbolRow[index]
        const downValue = downRow[index]
        const upValue = upRow[index]
        key += symbolValue
        return (
          <Key
            key={symbolValue}
            keyType="number"
            keyValue={keyValue}
            keySymbol={symbolValue}
            downSymbol={downSymbolValue}
            upSymbol={upSymbolValue}
            swipeDown={downValue}
            swipeUp={upValue}
            onPress={this.handleKeyPress}
            colCount={col}
            onClick={this.handleClick}
            onSwipe={this.handleSwipe}
          />)
      })
      const rowHeight = keyHeight / rowCount
      return <KeyboardRow key={key} height={rowHeight} >{keys}</KeyboardRow>
    })
    console.log(swipeValue)
    return (
      <Keyboard height={height}>
        {suggestionComponent}
        {keyboardRows}
        <KeyboardRow height={keyActionHeight}>
          <Key keyType="operator" keyValue={action} keySymbol={action} onPress={this.handleKeyPress} onClick={this.handleClick} onSwipe={this.handleSwipe} swipeDown={action} />
          <Key keyType="operator" keyValue={Keys.LEFT} keySymbol="←" onPress={this.handleKeyPress} onClick={this.handleClick} onSwipe={this.handleSwipe} swipeDown={Keys.LEFT} />
          <Key keyType="operator" keyValue={Keys.RIGHT} keySymbol="→" onPress={this.handleKeyPress} onClick={this.handleClick} onSwipe={this.handleSwipe} swipeDown={Keys.RIGHT} />
          <Key keyType="operator" keyValue={Keys.ENTER} keySymbol="↵" onPress={this.handleKeyPress} onClick={this.handleClick} onSwipe={this.handleSwipe} swipeDown={Keys.ENTER} />
        </KeyboardRow>
        {showLabel && <Label x={x} y={y} value={swipeValue} status={swipeStatus} />}
      </Keyboard>
    )
  }
}

// const KeyboardCompoxnent = ({ onPress, keyValues, keySymbols, swipeDownValue, action }) => {
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
  isMathJax: false,
}

KeyboardComponent.propTypes = {
  onPress: PropTypes.func.isRequired,
  onSuggestionPress: PropTypes.func,
  keywords: PropTypes.array,
  show: PropTypes.bool,
  isMathJax: PropTypes.bool,
}

export default KeyboardComponent
export { KeyboardType }
