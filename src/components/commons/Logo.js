import React, { Component } from 'react'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'
// import auth from 'auth0-lock'
import Auth0Lock from 'auth0-lock'
import propTypes from 'prop-types'
import { Sidebar, Segment, Menu, Icon } from 'semantic-ui-react'
import logo from '../../icon.png'
import profileImage from '../../assets/images/dummy.png'

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
  cursor: pointer;
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

// const ProfileContainer = styled.div`
//   display: flex;
//   align-items: center;
// `


   
const lock = new Auth0Lock(
  'XbROZxuwYdEHTQaGNN5irLFDpR5JB6b3',
  'ezam.auth0.com',
  {
    auth: {
      responseType: 'id_token',
      params: { scope: 'openid email' },
    },
  },
);

class SidebarMenu extends Component {
  state = { 
    visible: false,
    path: '/'
  }
 
  toggleVisibility = () => this.setState({ visible: !this.state.visible })

  logout = () => {
    lock.logout()
    window.localStorage.removeItem('auth0IdToken')
  }

  onPageChange = (path) => {
    this.setState({ path, visible: false })
    this.props.history.push(path)
  }

  render() {
    const { visible } = this.state
    const { onMouseDown } = this.props
    return (
      <Sidebar.Pushable style={{ borderWidth: '0px 0px 0px 0px', WebkitBoxShadow: '0 0 0 0', borderRadius: '0' }} as={Segment}>
        <Sidebar as={Menu} animation="push" width="thin" visible={visible} icon="labeled" vertical inverted>
          <Menu.Item onClick={() => this.onPageChange('/')} name="home">
            <Icon name="home" />
            Home
          </Menu.Item>
          <Menu.Item onClick={() => this.onPageChange('/post')} name="compose">
            <Icon name="compose" />
            New Post
          </Menu.Item>
          <Menu.Item onClick={() => this.onPageChange('/posts')} name="book">
            <Icon name="book" />
            My posts
          </Menu.Item>
          <Menu.Item onClick={() => this.onPageChange('/profile')} name="user circle">
            <Icon name="user circle" />
            Profile
          </Menu.Item>
          <Menu.Item onClick={() => this.onPageChange('/achievement')} name="user circle">
            <Icon name="trophy" />
            Achievement
          </Menu.Item>
          <Menu.Item onClick={() => this.onPageChange('/stats')} name="user circle">
            <Icon name="line chart" />
            Stats
          </Menu.Item>
          <Menu.Item onClick={this.logout} name="log out">
            <Icon name="log out" />
            Log out
          </Menu.Item>
        </Sidebar>
        <Sidebar.Pusher style={{ height: '100%' }}>
          <Segment style={{ height: '100%', padding: '0px 0px 0px 0px' }} basic>
            <NavBar onMouseDown={onMouseDown} >
              <Drawer onClick={this.toggleVisibility}>
                <Icon name="content" size="big" />
              </Drawer>
              <Logo onClick={() => this.props.history.push('/')} src={logo} alt="logo" />
              {/* <ProfileContainer>
                <div style={{ marginRight: '10px' }}>
                  <Icon name='idea' />
                  <span>12 Int </span>
                </div>
                <Profile onClick={() => this.props.history.push('/profile')} src={profileImage} alt="profile" />
              </ProfileContainer> */}
              <Profile onClick={() => this.props.history.push('/profile')} src={profileImage} alt="profile" />
            </NavBar>
            {this.props.children}
          </Segment>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    )
  }
}

SidebarMenu.propTypes = {
  history: propTypes.object.isRequired,
  children: propTypes.arrayOf(propTypes.object).isRequired,
}

export default withRouter(SidebarMenu)
