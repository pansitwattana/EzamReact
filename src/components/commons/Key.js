import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Keys } from '../data/Keys'
import StaticMath from './StaticMath'

const Key = styled.div`
  background-color: ${props => props.backgroundColor};
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
  user-select: none;
  transition: all 0.2s;
  width: ${props => props.width}%;
  ${props => props.highlight && `
    transform: scale(0.9);
  `}
  ${props => props.operator === 'true' && `
    color: white;
    background-color: #4C4F55;
  `}
  ${props => props.number && `
    border: 1px solid #e8e8e8;
    color: #919191;
  `}
  ${props => props.action === 'true' && `
    width: 33%;
    padding: 10px;
  `}
`

const Operation = styled.div`
  text-shadow: 0 1px 2px rgba(0,0,0,0.20);
  /* padding-left: ${props => props.padding};
  padding-right: ${props => props.padding}; */
  /* background-color: ${props => props.backgroundColor}; */
  /* border-radius: ${props => props.borderRadius}; */
  border: ${props => props.border};
  color: ${props => props.color};
  ${props => props.operator === 'true' && `
    font-size: 16px;
    display: inline;
    background-color: #4C4F55;
  `}
`

class KeyComponent extends Component {
  state = {
    pos: {
      x: 0,
      y: 0,
    },
    status: 'none',
  }

  onLongPress() {
    const {
      onPress, keyValue
    } = this.props

    if (keyValue === Keys.BACKSPACE) {
      this.setState({ status: 'none' })
      onPress(Keys.CLEAR)
    }
  }

  onTouchStart = (event) => {
    // console.log('start event')
    this.buttonPressTimer = setTimeout(() => this.onLongPress(), 500);
    const { touches } = event
    if (touches.length > 0) {
      const touch = touches[0]
      const { upSymbol, downSymbol } = this.props
      // console.log({ touch } )
      const pos = {
        x: touch.clientX,
        y: touch.clientY,
      }
      const value = { swipeUp: upSymbol, swipeDown: downSymbol }
      this.props.onClick({
        x: touch.pageX,
        y: touch.pageY,
      }, value)
      this.setState({
        pos,
        status: 'touch',
      })
    }
  }

  onTouchMove = (event) => {
    const { touches } = event
    // const { status } = this.state
    const { swipeDown, swipeUp } = this.props
    if (touches.length > 0) {
      // const height = 0
      const y = event.touches[0].clientY
      const deltaY = y - this.state.pos.y
      const { onSwipe } = this.props
      if (deltaY > 0 && swipeDown) {
        onSwipe(false, true)
        this.setState({ status: 'swipedown' })
      } else if (deltaY < 0 && swipeUp) {
        onSwipe(true, false)
        this.setState({ status: 'swipeup' })
      }
    }
  }

  onTouchEnd = () => {
    const { status } = this.state
    // console.log(status)
    this.eventFire(status)
    clearTimeout(this.buttonPressTimer);
    this.setState({
      pos: { x: 0, y: 0 },
      status: 'none',
    })
  }

  eventFire(status) {
    const {
      onPress, keyValue, swipeDown, swipeUp,
    } = this.props
    if (status === 'touch') {
      onPress(keyValue)
    } else if (status === 'swipedown') {
      onPress(swipeDown)
    } else if (status === 'swipeup') {
      onPress(swipeUp)
    }
  }

  render() {
    const {
      keyType, keySymbol = '', keyValue, highlight, colCount,
    } = this.props
    let align = 'middle'
    if (this.state.status === 'swipedown') {
      align = 'bottom'
    } else if (this.state.status === 'swipeup') {
      align = 'top'
    }
    let operator = false
    let number = false
    let action = false
    let padding = '0px'
    let backgroundColor = '#efefef'
    let keyColor = '#efefef'
    let borderRadius = '0px'
    let border = ''
    let color = '#555555'
    if (keyType === 'number') {
      number = true
      if (/^\d+$/.test(keyValue)) {
        keyColor = 'white'
        backgroundColor = 'white'
      }
    } else if (keyType === 'operator') {
      operator = true
      borderRadius = '20px'
      if (keyValue === Keys.PLUS) {
        padding = '9px'
        backgroundColor = '#cb7dc9'
      } else if (keyValue === Keys.RIGHT || keyValue === Keys.LEFT) {
        backgroundColor = '#00ffff'
        color = '#ffffff'
        padding = '10px'
      } else if (keyValue === Keys.ALPHABET || keyValue === Keys.NUMBER) {
        backgroundColor = '#323156'
        color = '#ffffff'
        padding = '10px'
        borderRadius = '2px'
      } else if (keyValue === Keys.ENTER) {
        backgroundColor = 'lightblue'
        color = '#ffffff'
        padding = '12px'
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
        operator={operator.toString()}
        action={action.toString()}
        width={width}
        align={align}
        backgroundColor={keyColor}
      >
        <Operation
          operator={operator.toString()}
          padding={padding}
          backgroundColor={backgroundColor}
          color={color}
          borderRadius={borderRadius}
          border={border}
          highlight={highlight}
        >
          <StaticMath>{keySymbol}</StaticMath>
        </Operation>
      </Key>)
  }
}

KeyComponent.defaultProps = {
  keySymbol: '',
  upSymbol: '',
  downSymbol: '',
  keyValue: '',
  highlight: false,
  colCount: 5,
  swipeDown: '',
  swipeUp: '',
}

KeyComponent.propTypes = {
  keyType: PropTypes.string.isRequired,
  keySymbol: PropTypes.string,
  upSymbol: PropTypes.string,
  downSymbol: PropTypes.string,
  keyValue: PropTypes.string,
  highlight: PropTypes.bool,
  onPress: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  onSwipe: PropTypes.func.isRequired,
  swipeDown: PropTypes.string,
  swipeUp: PropTypes.string,
  colCount: PropTypes.number,
}

export default KeyComponent
