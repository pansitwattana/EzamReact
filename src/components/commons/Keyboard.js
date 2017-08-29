import React, { PropTypes } from 'react'
import styled from 'styled-components'
import Key from './Key'

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
      <Key keyType="number" keyValue="9" keySymbol="9" onPress={onPress} />
    </KeyboardRow>
    <KeyboardRow>
      <Key keyType="number" keyValue="/pm" keySymbol="+/-" onPress={onPress} />
      <Key keyType="number" keyValue="0" keySymbol="0" onPress={onPress} />
      <Key keyType="number" keyValue="^" keySymbol="^" onPress={onPress} />
      <Key keyType="number" keyValue="." keySymbol="." onPress={onPress} />
    </KeyboardRow>

    <KeyboardRow>
      <Key
        keyType="operator"
        keyValue="divide"
        keySymbol="÷"
        onPress={onPress}
      />
      <Key
        keyType="operator"
        keyValue="substract"
        keySymbol="-"
        onPress={onPress}
      />
      <Key keyType="operator" keyValue="add" keySymbol="+" onPress={onPress} />
      <Key
        keyType="operator"
        keyValue="multiply"
        keySymbol="x"
        onPress={onPress}
      />
    </KeyboardRow>

    <KeyboardRow>
      <Key keyType="action" keyValue="back" keySymbol="<<" onPress={onPress} />
      <Key keyType="action" keyValue="equal" keySymbol="=" onPress={onPress} />
      <Key keyType="action" keyValue="enter" keySymbol="↵" onPress={onPress} />
    </KeyboardRow>
  </Keyboard>)

KeyboardComponent.propTypes = {
  onPress: PropTypes.func.isRequired,
}

export default KeyboardComponent
