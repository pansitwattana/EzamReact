import React from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'
import { gql, graphql } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import Error from './commons/Error'

const Profile = ({ userQuery }) => {
  const { user, loading, error } = userQuery
  if (loading) {
    return <Error message='Loading...' />
  } else if (error) {
    return <Error message={error} />
  } else if (!user) {
    return <Error message="Please Login" login onLoginClick={() => this.props.history.push('/login')}/>
  }

  const { credit, experience, name, email } = user
  const level = Math.ceil(experience / 1000) + 1


  return (
    <div>
      <Card style={{ width: '100%', display: 'flex' }}>
        <Image style={{ width: '200px', alignSelf: 'center' }} src="/images/user_account_profile_avatar_person_student_male-512.png" />
        <Card.Content>
          <Card.Header>{name}</Card.Header>
          <Card.Meta>Joined in 2016</Card.Meta>
          <Card.Description>{email}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <a>
            <Icon name="idea" />
            Level {level}
          </a>
        </Card.Content>
        {/* <Card.Content extra>
          <a>
            <Icon name="trophy" />
            #1 Ranking in Local
          </a>
        </Card.Content>
        <Card.Content extra>
          <a>
            <Icon name="puzzle" />
            Horse
          </a>
        </Card.Content>
        <Card.Content extra>
          <a>
            <Icon name="user" />
            30 Friends
          </a>
        </Card.Content> */}
        <Card.Content extra>
          <a>
            <Icon name="money" />
            {credit} Credits
          </a>
        </Card.Content>
      </Card>
    </div>
  )
}

const userQuery = gql`
  query {
    user {
      id
      credit
      experience
      name
      email
    }
  }
`

const ProfileWithUser = graphql(userQuery, {
  name: 'userQuery',
  options: { fetchPolicy: 'network-only' },
})(Profile)


export default withRouter(ProfileWithUser)
