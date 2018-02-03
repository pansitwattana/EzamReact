import React from 'react'
import styled from 'styled-components'

const Label = styled.div`
  position: absolute;
  left: 0em;
  top: 0em;
  width: 0;
  height: 0;
  border-top: 40px solid ${prop => prop.highlight ? 'rgba(0, 200, 50, .5)' : 'transparent' };
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

export default ({ text, show }) => (
  <div>
    <Label highlight={show}/>
    <Text>{text}</Text>
  </div>
)
