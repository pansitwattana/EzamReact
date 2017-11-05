import React, { Component } from 'react'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'
import { gql, graphql } from 'react-apollo'
import Menu from './commons/Menu'
import Logo from './commons/Logo'
import Course from './commons/Course'
import Search from './commons/Search'
import AddButton from './commons/AddButton'
import LoginButton from './commons/LoginButton'

const Background = styled.div`
  text-align: center; 
`

const CourseContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const CourseRow = styled.div`
  display: flex;
  align-items: space-between;
  width: 100%;
`

class Home extends Component {
  componentDidMount() {
    if (!this.props.location || !this.props.location.state) {
      return;
    }
    if (!this.props.location.state.data) {
      return;
    }
    if (this.props.location.state.data.username)
      console.log('login as ' + this.props.location.state.data.username)
    else {
      console.log('guest')
    }
  }

  render() {
    let addButton = <div></div>
    let loginButton = <LoginButton onClick={() => this.props.history.push('./login')} />
    if (!this.props.data.loading) {
      let user = this.props.data.user
      if (user) {
        addButton = <AddButton onClick={() => this.props.history.push('/post')} />
        loginButton = <div></div>
      }
    }
    return (
      <Background>
        <Logo />
        <Search />
        <Menu />
        <CourseContainer>
          <CourseRow>
            <Course
              title={'Calculus'}
              subtitle={'Basic'}
            />
            <Course
              title={'Calculus'}
              subtitle={'Hard'}
            />
            <Course
              title={'Set'}
              subtitle={'Basic'}
            />
          </CourseRow>
          <CourseRow>
            <Course
              title={'Possibility'}
              subtitle={'Basic'}
            />
            <Course
              title={'Algebra'}
              subtitle={'Basic'}
            />
            <Course
              title={'Trigonometry'}
              subtitle={'Intermediate'}
            />
          </CourseRow>
        </CourseContainer>
        {addButton}
        {loginButton}
      </Background>
    )
  }
}

const userQuery = gql`
query {
  user {
    id
  }
}
`

export default graphql(userQuery)(withRouter(Home))
