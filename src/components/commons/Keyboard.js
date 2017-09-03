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
  height: 50%;
  box-shadow: 10px 10px 10px 10px rgba(0, 0, 0, 0.25), 0 3px 1px -2px rgba(0, 0, 0, 0.2),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
`

const KeyboardRow = styled.div`
  display: table;
  background-color: #db8a8a;
  width: 100%;
  height: ${props => props.height};
`

const KeyboardComponent = ({ onPress, keyValues, keySymbols }) => {
  const keyboardRows = keyValues.map((values, row) => {
    const symbolRow = keySymbols[row]
    const col = symbolRow.length
    let key = ''
    const keys = values.map((value, index) => {
      const symbol = symbolRow[index]
      key += symbol
      return (
        <Key
          key={symbol}
          keyType="number"
          keyValue={value}
          keySymbol={symbol}
          onPress={onPress}
          colCount={col}
        />)
    })
    return <KeyboardRow key={key} height={'16%'} >{keys}</KeyboardRow>
  })
  return (
    <Keyboard>
      {keyboardRows}
      <KeyboardRow height={'20%'} >
        <Key keyType="operator" keyValue={Keys.CLEAR} keySymbol="C" onPress={onPress} />
        <Key keyType="operator" keyValue={Keys.LEFT} keySymbol="←" onPress={onPress} />
        <Key keyType="operator" keyValue={Keys.RIGHT} keySymbol="→" onPress={onPress} />
        <Key keyType="operator" keyValue={Keys.ENTER} keySymbol="↵" onPress={onPress} />
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
}

export default KeyboardComponent
export { KeyboardType }
