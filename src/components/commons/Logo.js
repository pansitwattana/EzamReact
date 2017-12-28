import React, { Component } from 'react'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'
import { Sidebar, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react'
import logo from '../../icon.png'

const NavBar = styled.div`
  background-color: #222;
  height: 50px;
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
  height: 35px;
`

const Drawer = styled.div`
  height: 40px;
  width: 40px;
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
      <Sidebar.Pushable style={{ borderWidth: '0px 0px 0px 0px', '-webkit-box-shadow': '0 0 0 0', 'border-radius': '0' }} as={Segment}>
        <Sidebar as={Menu} animation="push" width="thin" visible={visible} icon="labeled" vertical inverted>
          <Menu.Item onClick={() => this.props.history.push('/')} name="home">
            <Icon name="home" />
            Home
          </Menu.Item>
          <Menu.Item onClick={() => this.props.history.push('/post')} name="compose">
            <Icon name="compose" />
            New Post
          </Menu.Item>
          <Menu.Item onClick={() => this.props.history.push('/profile')} name="user circle">
            <Icon name="user circle" />
            Profile
          </Menu.Item>
        </Sidebar>
        <Sidebar.Pusher>
          <Segment style={{ height: '100%', padding: '0px 0px 0px 0px' }} basic>
            <NavBar onMouseDown={onMouseDown} >
              <Drawer onClick={this.toggleVisibility}>
                <Icon name="content" size="big" />
              </Drawer>
              <Logo src={logo} alt="logo" />
              <Profile src="images/user_account_profile_avatar_person_student_male-512.png" alt="profile" />
            </NavBar>
            {this.props.children}
          </Segment>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    )
  }
}

export default withRouter(SidebarMenu)
