import React, { Component } from 'react'
import { Icon, Menu } from 'semantic-ui-react'

export default class MenuExampleCompact extends Component {
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Menu style={{ margin: '10px 0', width: '250px', alignSelf: 'center' }} compact icon="labeled">
        <Menu.Item name="calculator" active={activeItem === 'calculator'} onClick={this.handleItemClick}>
          <Icon name="calculator" />
          Math
        </Menu.Item>

        <Menu.Item name="wrench" active={activeItem === 'wrench'} onClick={this.handleItemClick}>
          <Icon name="wrench" />
          Physics
        </Menu.Item>

        <Menu.Item name="lab" active={activeItem === 'lab'} onClick={this.handleItemClick}>
          <Icon name="lab" />
          Sciences
        </Menu.Item>
      </Menu>
    )
  }
}
