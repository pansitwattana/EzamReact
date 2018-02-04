import React from 'react'
import styled from 'styled-components'

const Label = styled.div`
  position: absolute;
  left: 0em;
  top: 0em;
  width: 0;
  height: 0;
  border-top: 40px solid ${prop => prop.highlight ? prop.color : 'transparent' };
  border-right: 40px solid transparent;
`

const Text = styled.div`
  position: absolute;
  font-size: 0.6em;
  color: white;
  left: 0em;
  top: 0em;
  transform: rotate(-45deg);
`

export default ({ text, show, color }) => (
  <div>
    <Label highlight={show} color={color === 'red' ? 'rgba(250, 30, 30, .5)' : 'rgba(0, 200, 50, .5)'} />
    <Text>{text}</Text>
  </div>
)
