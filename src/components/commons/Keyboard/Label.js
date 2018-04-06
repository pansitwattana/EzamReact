import React from 'react'
import styled from 'styled-components'
import StaticMath from '../StaticMath'

const FloatLabel = styled.div`
  position: absolute;
  top: ${prop => prop.y}px;
  left: ${prop => prop.x}px;
  color: blue;
  z-index: 3000;
`

const Arrow = styled.div`
  margin: 5px 0;
  width: 0px;
  height: 0px;
  display: flex;
  justify-content: center;
`

const ArrowUp = styled(Arrow)`
  border-left: 25px solid transparent;
  border-right: 25px solid transparent;
  border-bottom: 45px solid ${prop => prop.highlight ? '#ec1b5b' : '#000000'};
`

const ArrowDown = styled(Arrow)`
  border-left: 25px solid transparent;
  border-right: 25px solid transparent;
  border-top: 45px solid ${prop => prop.highlight ? '#ec1b5b' : '#000000'};
`

const Text = styled.div`
  color: white;
  position: relative;
  top: ${props => props.up ? '20px' : '-40px'};
  font-size: 0.85em;
`

const Label = ({ x, y, value, status }) => (
  <FloatLabel x={x} y={y}>
    {value.swipeUp && <ArrowUp highlight={status.swipeUp}><Text up><StaticMath>{value.swipeUp}</StaticMath></Text></ArrowUp>}
    {value.swipeDown && <ArrowDown highlight={status.swipeDown}><Text><StaticMath>{value.swipeDown}</StaticMath></Text></ArrowDown>}
  </FloatLabel>
)

export default Label
