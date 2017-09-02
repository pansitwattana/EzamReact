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
  border-radius: 2px;
  box-shadow: 10px 10px 10px 10px rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
`

const KeyboardRow = styled.div`
  display: table;
  background-color: #db8a8a;
  width: 100%;
`

const KeyboardComponent = ({ onPress }) => (
  <Keyboard>
    <KeyboardRow>
      <Key keyType="number" keyValue={Keys.LOG} keySymbol="Log" onPress={onPress} />
      <Key keyType="number" keyValue={Keys.ALPHABET} keySymbol="ABC" onPress={onPress} />
      <Key keyType="number" keyValue={Keys.SIN} keySymbol="Sin" onPress={onPress} />
      <Key keyType="number" keyValue={Keys.CLEAR} keySymbol="c" onPress={onPress} />
      <Key keyType="number" keyValue={Keys.DIVIDE} keySymbol="÷" onPress={onPress} />
    </KeyboardRow>
    <KeyboardRow>
      <Key keyType="number" keyValue={Keys.SQRT} keySymbol="√" onPress={onPress} />
      <Key keyType="number" keyValue="7" keySymbol="7" onPress={onPress} />
      <Key keyType="number" keyValue="8" keySymbol="8" onPress={onPress} />
      <Key keyType="number" keyValue="9" keySymbol="9" onPress={onPress} />
      <Key keyType="number" keyValue={Keys.TIMES} keySymbol="×" onPress={onPress} />
    </KeyboardRow>
    <KeyboardRow>
      <Key keyType="number" keyValue={Keys.EXP} keySymbol="^" onPress={onPress} />
      <Key keyType="number" keyValue="4" keySymbol="4" onPress={onPress} />
      <Key keyType="number" keyValue="5" keySymbol="5" onPress={onPress} />
      <Key keyType="number" keyValue="6" keySymbol="6" onPress={onPress} />
      <Key keyType="number" keyValue={Keys.MINUS} keySymbol="-" onPress={onPress} />
    </KeyboardRow>
    <KeyboardRow>
      <Key keyType="number" keyValue="x" keySymbol="x" onPress={onPress} />
      <Key keyType="number" keyValue="1" keySymbol="1" onPress={onPress} />
      <Key keyType="number" keyValue="2" keySymbol="2" onPress={onPress} />
      <Key keyType="number" keyValue="3" keySymbol="3" onPress={onPress} />
      <Key keyType="number" keyValue={Keys.PLUS} keySymbol="+" onPress={onPress} />
    </KeyboardRow>
    <KeyboardRow>
      <Key keyType="number" keyValue="(" keySymbol="(" onPress={onPress} />
      <Key keyType="number" keyValue=")" keySymbol=")" onPress={onPress} />
      <Key keyType="number" keyValue="0" keySymbol="0" onPress={onPress} />
      <Key keyType="number" keyValue={Keys.DOT} keySymbol="." onPress={onPress} />
      <Key keyType="number" keyValue={Keys.EQUAL} keySymbol="=" onPress={onPress} />
    </KeyboardRow>

    <KeyboardRow>
      <Key
        keyType="operator"
        keyValue={Keys.BACKSPACE}
        keySymbol="⌫"
        onPress={onPress}
      />
      <Key
        keyType="operator"
        keyValue={Keys.LEFT}
        keySymbol="←"
        onPress={onPress}
      />
      <Key
        keyType="operator"
        keyValue={Keys.RIGHT}
        keySymbol="→"
        onPress={onPress}
      />
      <Key
        keyType="operator"
        keyValue={Keys.ENTER}
        keySymbol="↵"
        onPress={onPress}
      />
    </KeyboardRow>
  </Keyboard>
)

KeyboardComponent.propTypes = {
  onPress: PropTypes.func.isRequired
}

export default KeyboardComponent
