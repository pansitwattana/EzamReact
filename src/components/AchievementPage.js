import React from 'react'
import { Card, Icon, Image, Progress } from 'semantic-ui-react'
import styled from 'styled-components'
import { gql, graphql } from 'react-apollo'
import Error from './commons/Error'
import Label from './commons/CornerLabel'
import testImg from '../assets/images/dummy.png'

const Container = styled.div`
  margin: 20px;
`

const AchievementCard = ({ coverImage, header, meta, count, need, unit, icon }) => (
  <Card>
    <Card.Content>
      {count >= need ? <Label text='Clear' show={count>=need} /> : undefined}
      <Card.Header>{header}</Card.Header>
      <Card.Meta>{meta}</Card.Meta>
    </Card.Content>
    <Card.Content extra>
      <a>
        <Icon name={icon} />
        {count}/{need} {unit}
      </a>
      <Progress percent={count > need ? 100 : count * 100 / need} indicating />
    </Card.Content>
  </Card>
)

const getHeader = (level) => {
  if (level === 1) {
    return 'Beginner'
  } else if (level === 2) {
    return 'Normal'
  } else if (level === 3) {
    return 'Hard'
  } else if (level === 4) {
    return 'Geneius'
  } else if (level === 5) {
    return 'Master'
  } else {
    return 'Beginner'
  }
}

const AchievementPage = ({ userQuery }) => {
  const { user, loading, error } = userQuery
  if (loading) {
    return <Error message='Loading...' />
  } else if (error) {
    return <Error message={error} />
  } else if (!user) {
    return <Error message={'not logged in'} />
  }

  const solveCount = user._solutionsMeta.count
  const postCount = user._postsMeta.count
  const commentCount = user._commentsMeta.count

  const solveLevel = Math.ceil(solveCount / 10)
  const solveNeed = 10 * solveLevel
  const solveHeader = getHeader(solveLevel)

  const postLevel = Math.ceil(postCount / 10)
  const postNeed = 10 * postLevel
  const postHeader = getHeader(postLevel)

  return (
    <Container>
      <Card.Group itemsPerRow={2} >
        <AchievementCard 
          coverImage={testImg}
          header={`${solveHeader} Solver`}
          icon="book"
          meta={`solve ${solveNeed} problems`}
          count={solveCount}
          need={solveNeed}
          unit="problems"
        />
        <AchievementCard 
          coverImage={testImg}
          header={`${postHeader} Questioner`}
          icon="book"
          meta={`post ${postNeed} problems`}
          count={postCount}
          need={postNeed}
          unit="problems"
        />
        <AchievementCard 
          coverImage={testImg}
          header="Beginner Commentator"
          icon="comments"
          meta="comment 10 texts"
          count={commentCount}
          need={10}
          unit="comments"
        />
      </Card.Group>
    </Container>
  )
}

const userQuery = gql`
  query {
    user {
      id
      _solutionsMeta {
        count
      }
      _postsMeta {
        count
      }
      _commentsMeta {
        count
      }
    }
  }
`
const AchievementUser = graphql(userQuery, {
  name: 'userQuery',
  options: { fetchPolicy: 'network-only' },
})(AchievementPage)

export default AchievementUser
