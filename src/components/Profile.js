import React from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'
import Header from './commons/Header'

const Profile = () => (
  <div>
    <Header text="Profile" />
    <Card style={{ width: '100%', display: 'flex' }}>
      <Image style={{ width: '200px', alignSelf: 'center' }}src="/images/user_account_profile_avatar_person_student_male-512.png" />
      <Card.Content>
        <Card.Header>Pansit Wattanaprasobsuk</Card.Header>
        <Card.Meta>Joined in 2016</Card.Meta>
        <Card.Description>Daniel is a comedian living in Nashville.</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <a>
          <Icon name="idea" />
          Level 10
        </a>
      </Card.Content>
      <Card.Content extra>
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
      </Card.Content>
      <Card.Content extra>
        <a>
          <Icon name="money" />
          300 Credits
        </a>
      </Card.Content>
    </Card>
  </div>
)

export default Profile
