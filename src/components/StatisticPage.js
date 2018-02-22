import React from 'react'
import { gql, graphql } from 'react-apollo'
import { Card, Statistic } from 'semantic-ui-react'
import moment from 'moment'
import styled from 'styled-components'
import Error from './commons/Error'
import LineChart from './commons/LineChart'
import BarChart from './commons/ฺBarChart'

const dayDiffer = (d1, d2) => {
  var diff = Math.abs(d1.getTime() - d2.getTime());
  return diff / (1000 * 60 * 60 * 24);
};

const aggregateSubject = (solutions) => {
  const titles = ['Calculus', 'Equation', 'Differential', 'Geometry', 'Algebra', 'Exponential', 'Function', 'Trigonometry', 'Matrix', 'Kinetics', 'Static', 'Force', 'Electric', 'Momentum', 'Work', 'Pressure', 'Electrolyte', 'Reaction']
  const data = titles.map(title => {
    const matchSolutions = solutions.filter(solution => {
      return solution.post.tags.filter(tag => tag.name === title).length > 0
    })
    return matchSolutions.length
  })

  let barLabels = titles.sort((a, b) => {
    let indexA = titles.indexOf(a)
    let indexB = titles.indexOf(b)
    let valueOfA = data[indexA]
    let valueOfB = data[indexB]
    return valueOfB - valueOfA
  })
  let barData = data.sort((a, b) => b - a)
  barData = barData.slice(0, 10)
  barLabels = barLabels.slice(0, 10)

  return { barData, barLabels }
}

const aggregateLastWeek = (datas) => {
  const lastWeek = datas.filter(data => dayDiffer(new Date(data.createdAt), new Date()) <= 7)
  // let now = new Date();
  
  let counts = []
  let labels = []

  for (let i = -6; i <= 1; i++) {
    let day = moment().weekday(i).format('ddd')
    let count = 0
    lastWeek.forEach(date => {
      if(moment(date.createdAt).format('ddd') === day) {
        count += 1
      }
    })
    counts.push(count)
    labels.push(day)
  }
  // console.log(counts)
  labels[labels.length - 1] = 'Today'
  return { data: counts, labels, sum: lastWeek.length }
}

const Container = styled.div`
  width: 92%;
  margin: 5% auto;
  height: 100%;
`

const StatisticPage = ({ userQuery }) => {
  const { user, loading, error } = userQuery
  if (loading) {
    return <Error message='Loading...' />
  } else if (error) {
    return <Error message={error.message} />
  } else if (!user) {
    return <Error message={'not logged in'} />
  }
  const { data, labels, sum } = aggregateLastWeek(user.solutions)
  const { barData, barLabels } = aggregateSubject(user.solutions)
  const totalSolves = user.solutions.length
  const totalCreated = user._postsMeta.count
  const totalComments = user._commentsMeta.count
  // console.log(data)
  return (
    <Container>
      <Statistic.Group>
        <Statistic>
          <Statistic.Value>{totalSolves}</Statistic.Value>
          <Statistic.Label>Solved</Statistic.Label>
        </Statistic>
        <Statistic>
          <Statistic.Value>{totalCreated}</Statistic.Value>
          <Statistic.Label>Problems Created</Statistic.Label>
        </Statistic>
        <Statistic>
          <Statistic.Value>{totalComments}</Statistic.Value>
          <Statistic.Label>Comments</Statistic.Label>
        </Statistic>
      </Statistic.Group>
      <Card.Group style={{ marginTop: '20px'}}>
        <Card style={{ width: '96%', margin: '2%', padding: '4% 4% 4% 0%' }}>
          <LineChart labels={labels} data={data} detail='Solves' />
          <Card.Content>
            <Card.Header>Solved in last week</Card.Header>
            <Card.Description>Total {sum} problems</Card.Description>
          </Card.Content>
        </Card>
        <Card style={{ width: '96%', margin: '2%', padding: '4% 4% 4% 0%' }}>
          <BarChart labels={barLabels} data={barData} detail='Solves' />
        </Card>
      </Card.Group>
    </Container>
  )
}

const userQuery = gql`
query {
  user {
    id
    _postsMeta {
      count
    }
    _commentsMeta {
      count
    }
    solutions(orderBy: createdAt_DESC) {
      id
      createdAt
      post {
        tags {
          name
        }
      }
    }
  }
}
`

const StatsUser = graphql(userQuery, {
  name: 'userQuery',
  options: { fetchPolicy: 'network-only' },
})(StatisticPage)

export default StatsUser
