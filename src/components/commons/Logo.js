import React, { Component } from 'react'
import styled from 'styled-components'
import { Sidebar, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react'
import logo from '../../icon.png'

const NavBar = styled.div`
  background-color: #222;
  height: 50px;
  padding-top: 5px;
  color: white;
  text-align: center;
  justify-content: space-between;
  align-items: center;
  display: flex;
`

const Logo = styled.img`
  height: 50px;
`

const Profile = styled.img`
  height: 30px;
`

const Drawer = styled.div`
  height: 30px;
  width: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`

class SidebarMenu extends Component {
  state = { visible: false }

  toggleVisibility = () => this.setState({ visible: !this.state.visible })

  render() {
    const { visible } = this.state
    const { onMouseDown } = this.props
    return (
      <NavBar onMouseDown={onMouseDown} >
        <Drawer onClick={this.toggleVisibility}>
          <Icon name="content" size="big" />
        </Drawer>
        <Logo src={logo} alt="logo" />
        <Profile src="images/user_account_profile_avatar_person_student_male-512.png" alt="profile" />
      </NavBar>
    )
  }
}

export default SidebarMenu
