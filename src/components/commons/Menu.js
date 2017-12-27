import React, { Component } from 'react'
import styled from 'styled-components'
import propTypes from 'prop-types'

const items = ['Mathematics', 'Physics', 'Sciences']

const Menu = styled.div`
  padding: 10px 10px;
  width: 100%;
`

const Item = styled.span`
  background-color: white; /* Green */
  border: 2px solid rgb(200, 200, 200);
  color: rgb(200, 200, 200);
  padding: 8px 15px;
  text-align: center;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  ${props => props.active && `
    color: white;
    background-color: #f31b63;
    border: 2px solid #f31b63;
  `}
`

export default class MenuExampleColoredInverted extends Component {
  static propTypes = {
    onClick: propTypes.func.isRequired,
  }

  state = { activeItem: items[0] }

  handleClick = (item) => {
    this.setState({ activeItem: item })
    this.props.onClick(item)
  }

  render() {
    const { activeItem } = this.state

    return (
      <Menu>
        {items.map(item => (
          <Item key={item} active={activeItem === item} onClick={() => this.handleClick(item)}>
            {item}
          </Item>
        ))}
      </Menu>
    )
  }
}
