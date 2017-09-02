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
`

const KeyboardRow = styled.div`
  display: table;
  background-color: #DB8A8A;
  width: 100%;
`

const KeyboardComponent = ({ onPress }) =>
  (<Keyboard>
    <KeyboardRow>
      <Key keyType="number" keyValue="1" keySymbol="1" onPress={onPress} />
      <Key keyType="number" keyValue="2" keySymbol="2" onPress={onPress} />
      <Key keyType="number" keyValue="3" keySymbol="3" onPress={onPress} />
      <Key keyType="number" keyValue="3" keySymbol="3" onPress={onPress} />
    </KeyboardRow>
    <KeyboardRow>
      <Key keyType="number" keyValue="4" keySymbol="4" onPress={onPress} />
      <Key keyType="number" keyValue="5" keySymbol="5" onPress={onPress} />
      <Key keyType="number" keyValue="6" keySymbol="6" onPress={onPress} />
      <Key keyType="number" keyValue="6" keySymbol="6" onPress={onPress} />
    </KeyboardRow>
    <KeyboardRow>
      <Key keyType="number" keyValue="7" keySymbol="7" onPress={onPress} />
      <Key keyType="number" keyValue="8" keySymbol="8" onPress={onPress} />
      <Key keyType="number" keyValue="9" keySymbol="9" onPress={onPress} />
      <Key keyType="number" keyValue="0" keySymbol="0" onPress={onPress} />
    </KeyboardRow>
    <KeyboardRow>
      <Key keyType="number" keyValue="x" keySymbol="x" onPress={onPress} />
      <Key keyType="number" keyValue="0" keySymbol="0" onPress={onPress} />
      <Key keyType="number" keyValue={Keys.LEFT} keySymbol="<" onPress={onPress} />
      <Key keyType="number" keyValue={Keys.RIGHT} keySymbol=">" onPress={onPress} />
    </KeyboardRow>

    <KeyboardRow>
      <Key
        keyType="operator"
        keyValue={Keys.DIVIDE}
        keySymbol="÷"
        onPress={onPress}
      />
      <Key
        keyType="operator"
        keyValue={Keys.MINUS}
        keySymbol="-"
        onPress={onPress}
      />
      <Key keyType="operator" keyValue={Keys.PLUS} keySymbol="+" onPress={onPress} />
      <Key
        keyType="operator"
        keyValue={Keys.TIMES}
        keySymbol="x"
        onPress={onPress}
      />
    </KeyboardRow>

    <KeyboardRow>
      <Key keyType="action" keyValue={Keys.BACKSPACE} keySymbol="<<" onPress={onPress} />
      <Key keyType="action" keyValue={Keys.EQUAL} keySymbol="=" onPress={onPress} />
      <Key keyType="action" keyValue={Keys.ENTER} keySymbol="↵" onPress={onPress} />
    </KeyboardRow>
  </Keyboard>)

KeyboardComponent.propTypes = {
  onPress: PropTypes.func.isRequired,
}

export default KeyboardComponent
