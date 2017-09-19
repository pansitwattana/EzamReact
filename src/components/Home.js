import React, { Component } from 'react'
import styled from 'styled-components'
import { Input } from 'semantic-ui-react'
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

const Search = styled.div`
  padding: 10px 10px 10px 10px;
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
        <Search>
          <Input style={{ width: '100%' }} icon="search" placeholder="Search..." />
        </Search>
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
