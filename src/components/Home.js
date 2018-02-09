import React, { Component } from 'react'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'
import { gql, graphql } from 'react-apollo'
import Menu from './commons/Menu'
// import Logo from './commons/Logo'
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
          count: 0,
        },
        {
          title: 'Equation',
          subtitle: 'Basic',
          id: 2,
          count: 0,
        },
        {
          title: 'Differential',
          subtitle: 'Basic',
          id: 3,
          count: 0,
        },
        {
          title: 'Geometry',
          subtitle: 'Basic',
          id: 4,
          count: 0,
        },
        {
          title: 'Algebra',
          subtitle: 'Basic',
          id: 5,
          count: 0,
        },
        {
          title: 'Exponential',
          subtitle: 'Basic',
          id: 6,
          count: 0,
        },
        {
          title: 'Function',
          subtitle: 'Basic',
          id: 7,
          count: 0,
        },
        {
          title: 'Matrix',
          subtitle: 'Basic',
          id: 8,
          count: 0,
        },
        {
          title: 'Trigonometry',
          subtitle: 'Basic',
          id: 9,
          count: 0,
        },
      ],
      Physics: [
        {
          title: 'Kinetics',
          subtitle: 'Basic',
          id: 1,
          count: 0,
        },
        {
          title: 'Static',
          subtitle: 'Basic',
          id: 2,
          count: 0,
        },
        {
          title: 'Force',
          subtitle: 'Basic',
          id: 3,
          count: 0,
        },
        {
          title: 'Electric',
          subtitle: 'Basic',
          id: 4,
          count: 0,
        },
        {
          title: 'Momentum',
          subtitle: 'Basic',
          id: 5,
          count: 0,
        },
        {
          title: 'Work',
          subtitle: 'Basic',
          id: 6,
          count: 0,
        },
      ],
      Sciences: [
        {
          title: 'Pressure',
          subtitle: 'Basic',
          id: 1,
          count: 0,
        },
        {
          title: 'Electrolyte',
          subtitle: 'Basic',
          id: 2,
          count: 0,
        },
        {
          title: 'Reaction',
          subtitle: 'Basic',
          id: 3,
          count: 0,
        }
      ],
    },
    currentSubject: 'Mathematics',
  }

  checkCount(subject, solutions) {
    const newSubject = subject.map(s => {
      const { title } = s
      const matchSolutions = solutions.filter(solution => {
        return solution.post.tags.filter(tag => tag.name === title).length > 0
      })
      const newS = s
      newS.count = matchSolutions.length
      return newS
    })
    
    return newSubject
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.userQuery.loading && this.props.userQuery.loading) {
      const { user } = nextProps.userQuery
      let { tags } = this.state
      let math = this.checkCount(tags.Mathematics, user.solutions)
      let physics = this.checkCount(tags.Physics, user.solutions)
      let sci = this.checkCount(tags.Sciences, user.solutions)
      tags.Mathematics = math
      tags.Physics = physics
      tags.Sciences = sci
      this.setState({ tags })
    }
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
    if (!this.props.userQuery.loading) {
      const { user } = this.props.userQuery
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
        itemCount={subject.count}
      />
    ))
    const secondRow = titles.slice(3, 6).map(subject => (
      <Course
        key={subject.id}
        title={subject.title}
        subtitle={subject.subtitle}
        itemCount={subject.count}
      />
    ))
    const thirdRow = titles.slice(6, 9).map(subject => (
      <Course
        key={subject.id}
        title={subject.title}
        subtitle={subject.subtitle}
        itemCount={subject.count}
      />
    ))
    return (
      // <Logo>
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
            <CourseRow>
              {thirdRow}
            </CourseRow>
          </CourseContainer>
          {addButton}
          {loginButton}
        </Background>
      // </Logo>
    )
  }
}

const userQuery = gql`
query {
  user {
    id
    solutions {
      post {
        tags {
          name
        }
      }
    }
  }
}
`

const HomeUser = graphql(userQuery, {
  name: 'userQuery',
  options: { fetchPolicy: 'network-only' },
})(Home)

export default withRouter(HomeUser)
