import React, { Component } from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Card } from 'semantic-ui-react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
// import queryPosts from '../graph/Post'
import Header from './commons/Header'
import Search from './commons/Search'
import LaTex from './commons/LaTeX'
import { GraphQLClient } from 'graphql-request'

const client = new GraphQLClient('https://api.graph.cool/simple/v1/cj951wqgw0iy40126c3pm1z8x', {
  headers: {
    Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1MDgzMTYyNDksImNsaWVudElkIjoiY2o4d3NqdHB6MGhlbzAxNDE2d3AyeXdzbyJ9.jrIdcEsm6Ip5OH8XIq8Q6GGDhKU8v3PRZK-5IMaaS0M',
  },
});
const Author = styled.div`
  font-size: 10px;
  color: grey;
`

const Status = styled.span`
  font-size: 15px;
  color: green;
`

class Catalog extends Component {
  state = {
    problems: [
      {
        id: '11',
        content: 'Differential',
        difficulty: 'Easy',
        author: 'NeoKarn',
        detail: 'y = 5x^2+7',
        description: '\\text{find } \\space \\frac{dy}{dx}',
        isClear: true,
      },
      {
        id: '21',
        content: 'Differential',
        difficulty: 'Easy',
        author: 'NeoKarn',
        detail: 'y = (x+\\frac{1}{x})(x-\\frac{1}{x}+1)',
        description: '\\text{find } \\space \\frac{dy}{dx}',
        isClear: true,
      },
      {
        id: '12',
        content: 'Limit',
        difficulty: 'Easy',
        author: 'FBKarn',
        detail: '\\lim_{x\\to2}f(x)=5',
        description: '\\text{, find } x',
        isClear: false,
      },
      {
        id: '13',
        content: 'Integration',
        difficulty: 'Normal',
        author: 'Anonymous',
        detail: '\\int_{3}^{5} x^2 dx',
        description: '',
        isClear: true,
      },
      {
        id: '14',
        content: 'Integration',
        difficulty: 'Hard',
        author: 'Anonymous',
        detail: '\\int \\sqrt{1+y^2} dy',
        description: '',
        isClear: false,
      },
      {
        id: '15',
        content: 'Integration',
        difficulty: 'Normal',
        author: 'Anonymous',
        detail: '\\begin{cases}F(R_i) & d(R) = 0\\\\1 &d(R) = i\\\\0 & \textrm{otherwise.}\\end{cases}',
        description: '',
        isClear: true,
      },
    ],
  }

  componentWillMount() {
    client.request(`
    {
      allPosts{
        title
        latex
      }
    }
    `).then((value) => {
      console.log(value)
    })
  }

  onClick(index) {
    console.log(this.state.problems[index])
    this.props.changePage(this.state.problems[index], 'Paper')
  }

  renderProblems() {
    return this.state.problems.map((problem, index) => {
      const answerSpan = problem.isClear ? <Status>Answered</Status> : <div />
      return (
        <Card key={problem.id} style={{ width: '95%' }} onClick={() => this.onClick(index)}>
          <Card.Content>
            <Card.Header style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <span>{problem.content}</span>
              {answerSpan}
            </Card.Header>
            <Card.Meta style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <span>{problem.difficulty}</span>
              <Author>Author by {problem.author}</Author>
            </Card.Meta>
            <Card.Description><LaTex text={problem.detail} id={problem.id} /></Card.Description>
          </Card.Content>
        </Card>
      )
    })
  }

  render() {
    return (
      <div>
        <Header text={'Calculus'} />
        <Search />
        <Card.Group style={{ display: 'flex', justifyContent: 'center', margin: 0 }}>
          {this.renderProblems()}
        </Card.Group>
      </div>
    )
  }
}

Catalog.defaultProps = {
  title: 'Course',
}

Catalog.propTypes = {
  title: PropTypes.string,
}

const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: (problem, page) => push(`/${page}`, { data: problem }),
}, dispatch)

export default connect(
  null,
  mapDispatchToProps,
)(Catalog)
