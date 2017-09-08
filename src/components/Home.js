import React, { Component } from 'react'
import styled from 'styled-components'
import Menu from './commons/Menu'
import Course from './commons/Course'
import logo from '../icon.png'

const Background = styled.div`text-align: center;`

const Header = styled.div`
  background-color: #222;
  height: 80px;
  padding: 20px 10px;
  color: white;
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

const Image = styled.img`height: 60px;`

class Home extends Component {
  componentWillMount() {
    console.log('upate')
  }

  render() {
    return (
      <Background>
        <Header>
          <Image src={logo} alt="logo" />
        </Header>
        <Menu />
        <CourseContainer>
          <CourseRow>
            <Course
              title={'Calculus'}
              subtitle={'learn about Differential and Integration'}
            />
            <Course
              title={'Calculus'}
              subtitle={'learn about Differential and Integration'}
            />
            <Course
              title={'Calculus'}
              subtitle={'learn about Differential and Integration'}
            />
          </CourseRow>
          <CourseRow>
            <Course
              title={'Calculus'}
              subtitle={'learn about Differential and Integration'}
            />
            <Course
              title={'Calculus'}
              subtitle={'learn about Differential and Integration'}
            />
            <Course
              title={'Calculus'}
              subtitle={'learn about Differential and Integration'}
            />
          </CourseRow>
        </CourseContainer>
      </Background>
    )
  }
}

export default Home
