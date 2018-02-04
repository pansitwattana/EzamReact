import React from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'
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
    </Card.Content>
  </Card>
)

const AchievementPage = ({ userQuery }) => {
  if (userQuery.loading) {
    return <Error message='Loading...'/>
  } else if (userQuery.error) {
    return <Error message={userQuery.error} />
  }

  const { user } = userQuery
  const solveCount = user._solutionsMeta.count
  const postCount = user._postsMeta.count
  const commentCount = user._commentsMeta.count

  return (
    <Container>
      <Card.Group itemsPerRow={2} >
        <AchievementCard 
          coverImage={testImg}
          header="Beginner Solver"
          icon="book"
          meta="solve 10 problems"
          count={solveCount}
          need={10}
          unit="problems"
        />
        <AchievementCard 
          coverImage={testImg}
          header="Beginner Questioner"
          icon="book"
          meta="post 10 problems"
          count={postCount}
          need={10}
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
