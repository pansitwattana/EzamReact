import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Key from './Key'
import { Keys } from '../data/Keys'

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

const KeyboardComponent = ({ onPress, keyValues, keySymbols, swipeDownValue, action }) => {
  const rowCount = keySymbols.length
  const height = (9 * keyValues.length)
  const keyboardRows = keyValues.map((values, row) => {
    const symbolRow = keySymbols[row]
    const downRow = swipeDownValue[row]
    const col = symbolRow.length
    let key = ''
    const keys = values.map((value, index) => {
      const symbol = symbolRow[index]
      const downValue = downRow[index]
      key += symbol
      return (
        <Key
          key={symbol}
          keyType="number"
          keyValue={value}
          keySymbol={symbol}
          swipeDown={downValue}
          onPress={onPress}
          colCount={col}
        />)
    })
    const rowHeight = 80 / rowCount
    return <KeyboardRow key={key} height={rowHeight} >{keys}</KeyboardRow>
  })
  return (
    <Keyboard height={height}>
      {keyboardRows}
      <KeyboardRow height={'20'}  >
        <Key keyType="operator" keyValue={action} keySymbol={action} onPress={onPress} swipeDown={action} />
        <Key keyType="operator" keyValue={Keys.LEFT} keySymbol="←" onPress={onPress} swipeDown={Keys.LEFT} />
        <Key keyType="operator" keyValue={Keys.RIGHT} keySymbol="→" onPress={onPress} swipeDown={Keys.RIGHT} />
        <Key keyType="operator" keyValue={Keys.ENTER} keySymbol="↵" onPress={onPress} swipeDown={Keys.ENTER} />
      </KeyboardRow>
    </Keyboard>
  )
}

const KeyboardType = {
  MATH: 'MATH',
  ALPHABET: 'ALPHABET',
}

KeyboardComponent.propTypes = {
  onPress: PropTypes.func.isRequired,
  keyValues: PropTypes.array.isRequired,
  keySymbols: PropTypes.array.isRequired,
  swipeDownValue: PropTypes.array.isRequired,
  action: PropTypes.string.isRequired,
}

export default KeyboardComponent
export { KeyboardType }
