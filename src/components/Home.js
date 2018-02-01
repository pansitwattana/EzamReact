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
  height: 100%;
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
  state = {
    tags: {
      Mathematics: [
        {
          title: 'Calculus',
          subtitle: 'Basic',
          id: 1,
        },
        {
          title: 'Equation',
          subtitle: 'Basic',
          id: 2,
        },
        {
          title: 'Differential',
          subtitle: 'Basic',
          id: 3,
        },
        {
          title: 'Geometry',
          subtitle: 'Basic',
          id: 4,
        },
        {
          title: 'Algebra',
          subtitle: 'Basic',
          id: 5,
        },
        {
          title: 'Exponential',
          subtitle: 'Basic',
          id: 6,
        },
      ],
      Physics: [
        {
          title: 'Kinetics',
          subtitle: 'Basic',
          id: 1,
        },
        {
          title: 'Static',
          subtitle: 'Basic',
          id: 2,
        },
        {
          title: 'Force',
          subtitle: 'Basic',
          id: 3,
        },
        {
          title: 'Electric',
          subtitle: 'Basic',
          id: 4,
        },
        {
          title: 'Momentum',
          subtitle: 'Basic',
          id: 5,
        },
        {
          title: 'Work',
          subtitle: 'Basic',
          id: 6,
        },
      ],
      Sciences: [
        {
          title: 'Newton',
          subtitle: 'Basic',
          id: 1,
        },
        {
          title: 'Trigonometry',
          subtitle: 'Basic',
          id: 2,
        },
        {
          title: 'Set',
          subtitle: 'Basic',
          id: 3,
        },
        {
          title: 'Probability',
          subtitle: 'Basic',
          id: 4,
        },
        {
          title: 'Algebra',
          subtitle: 'Basic',
          id: 5,
        },
        {
          title: 'Function',
          subtitle: 'Basic',
          id: 6,
        },
      ],
    },
    currentSubject: 'Mathematics',
  }

  componentDidMount() {
    if (!this.props.location || !this.props.location.state) {
      return;
    }
    if (!this.props.location.state.data) {
      return;
    }
    if (this.props.location.state.data.username)
      {console.log('login as ' + this.props.location.state.data.username)}
    else {
      console.log('guest')
    }
  }

  onSubjectChange = (subject) => {
    this.setState({ currentSubject: subject })
  }

  render() {
    let addButton = <div />
    let loginButton = <LoginButton onClick={() => this.props.history.push('./login')} />
    if (!this.props.data.loading) {
      const { user } = this.props.data
      if (user) {
        addButton = <AddButton onClick={() => this.props.history.push('/post')} />
        loginButton = <div />
      }
    }
    const titles = this.state.tags[this.state.currentSubject]
    const firstRow = titles.slice(0, 3).map(subject => (
      <Course
        key={subject.id}
        title={subject.title}
        subtitle={subject.subtitle}
      />
    ))
    const secondRow = titles.slice(3, 6).map(subject => (
      <Course
        key={subject.id}
        title={subject.title}
        subtitle={subject.subtitle}
      />
    ))
    return (
      <Logo>
        <Background>
          <Search value="" />
          <Menu onClick={this.onSubjectChange} />
          <CourseContainer>
            <CourseRow>
              {firstRow}
            </CourseRow>
            <CourseRow>
              {secondRow}
            </CourseRow>
          </CourseContainer>
          {addButton}
          {loginButton}
        </Background>
      </Logo>
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
