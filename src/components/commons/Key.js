import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Keys } from '../data/Keys'

const Key = styled.div`
  background-color: #ffffff;
  display: table-cell;
  vertical-align: ${props => props.align};
  text-align: center;
  font-size: auto;
  font-weight: bolder;
  font-family: 'Droid Serif', serif;
  font-family: 'Bitter', serif;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -o-user-select: none;
  user-select: none
  transition: all 0.2s;
  width: ${props => props.width}%;
  ${props => props.highlight && `
    transform: scale(0.9);
  `}
  ${props => props.operator && `
    width: 25%;
    color: white;
  `}
  ${props => props.number && `
    border: 1px solid #e8e8e8;
    color: #919191;
  `}
  ${props => props.action && `
    width: 33%;
    padding: 20px;
  `}
`

const Operation = styled.div`
  text-shadow: 0 1px 2px rgba(0,0,0,0.20);
  padding-left: ${props => props.padding};
  padding-right: ${props => props.padding};
  background-color: ${props => props.backgroundColor};
  border-radius: ${props => props.borderRadius};
  border: ${props => props.border};
  color: ${props => props.color};
  ${props => props.operator && `
    padding-top: 8px;
    padding-bottom: 8px;
    display: inline;
    box-shadow:
      0 2px 2px 0 rgba(0,0,0,.14),
      0 3px 1px -2px rgba(0,0,0,.2),
      0 1px 5px 0 rgba(0,0,0,.12);
  `}
`

class KeyComponent extends Component {
  state = {
    pos: {
      x: 0,
      y: 0,
    },
    height: 0,
    status: 'none',
  }

  onTouchStart = (event) => {
    // console.log('start event')
    const touches = event.touches
    if (touches.length > 0) {
      this.setState({
        pos: {
          x: touches[0].clientX,
          y: touches[0].clientY,
        },
        height: touches[0].target.clientHeight,
        status: 'touch',
      })
    }
  }

  onTouchMove = (event) => {
    const touches = event.touches
    const status = this.state.status
    if (touches.length > 0 && status !== 'swipe') {
      const height = this.state.height
      const y = event.touches[0].clientY
      if (y - this.state.pos.y > height) {
        this.setState({ status: 'swipe' })
      }
    }
  }

  onTouchEnd = (event) => {
    const status = this.state.status
    // console.log(status)
    this.eventFire(status)

    this.setState({
      pos: { x: 0, y: 0 },
      height: 0,
      status: 'none',
    })
  }

  eventFire(status) {
    const { onPress, keyValue, swipeDown } = this.props
    if (status === 'touch') {
      onPress(keyValue)
    } else if (status === 'swipe') {
      onPress(swipeDown)
    }
  }

  render() {
    const { keyType, keySymbol = '', keyValue, highlight, colCount } = this.props
    const align = this.state.status === 'swipe' ? 'bottom' : 'middle'
    let operator = false
    let number = false
    let action = false
    let padding = '0px'
    let backgroundColor = 'white'
    let borderRadius = '0px'
    let border = ''
    let color = '#555555'
    if (keyType === 'number') {
      number = true
    } else if (keyType === 'operator') {
      operator = true
      borderRadius = '20px'
      if (keyValue === Keys.PLUS) {
        padding = '12px'
        backgroundColor = '#cb7dc9'
      } else if (keyValue === Keys.RIGHT || keyValue === Keys.LEFT) {
        backgroundColor = '#00ffff'
        color = '#000000'
        padding = '13px'
      } else if (keyValue === Keys.ALPHABET || keyValue === Keys.NUMBER) {
        backgroundColor = '#323156'
        color = '#ffffff'
        padding = '12px'
        borderRadius = '2px'
      } else if (keyValue === Keys.ENTER) {
        backgroundColor = '#ec1b5b'
        color = '#ffffff'
        padding = '15px'
        borderRadius = '7px'
      }
    } else if (keyType === 'action') {
      action = true
      borderRadius = '10px'
      if (keyValue === Keys.BACKSPACE) {
        color = '#d68086'
      } else if (keyValue === Keys.EQUAL) {
        color = '#9ed8a6'
      } else if (keyValue === Keys.ENTER) {
        color = 'red'
      }
      border = `1px solid ${color}`
    }
    const width = Math.floor(100 / colCount)
    return (
      <Key
        onTouchStart={this.onTouchStart}
        onTouchMove={this.onTouchMove}
        onTouchEnd={this.onTouchEnd}
        number={number}
        operator={operator}
        action={action}
        width={width}
        align={align}
      >
        <Operation
          operator={operator}
          padding={padding}
          backgroundColor={backgroundColor}
          color={color}
          borderRadius={borderRadius}
          border={border}
          highlight={highlight}
        >
          <span>{keySymbol}</span>
        </Operation>
      </Key>)
  }
}

KeyComponent.defaultProps = {
  keySymbol: '',
  keyValue: '',
  highlight: false,
  colCount: 5,
}

KeyComponent.propTypes = {
  keyType: PropTypes.string.isRequired,
  keySymbol: PropTypes.string,
  keyValue: PropTypes.string,
  highlight: PropTypes.bool,
  onPress: PropTypes.func.isRequired,
  swipeDown: PropTypes.string.isRequired,
  colCount: PropTypes.number,
}

export default KeyComponent
