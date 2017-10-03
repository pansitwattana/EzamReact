import React, { Component } from 'react'
import styled from 'styled-components'
import Menu from './commons/Menu'
import Logo from './commons/Logo'
import Course from './commons/Course'
import Search from './commons/Search'

const Background = styled.div`text-align: center;`

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
  componentWillMount() {
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
      </Background>
    )
  }
}

export default Home
