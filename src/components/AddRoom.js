import React, { Component } from 'react'
import { gql, graphql } from 'react-apollo'
import styled from 'styled-components';
import { Input, Icon, Button, Checkbox } from 'semantic-ui-react'
import Options from './commons/Options';

const Container = styled.div`
  margin: 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

class AddRoom extends Component {
  state = {
    title: '',
    allowPost: false,
  }

  onTagAdded = (tag) => {
    console.log(tag)
  }

  render() {
    const { data } = this.props
    const { loading, allUsers } = data
    let users = []
    if (loading === false) {
      users = allUsers.map(user => ({ key: user.id, text: user.email, value: user.email }))
    }
    const { allowPost, title } = this.state
    return (
      <Container>
        <Input
          size='big'
          style={{ width: '100%', margin: '5% 0' }}
          placeholder="Room Title"
          value={title}
          onChange={e => this.setState({ title: e.target.value })}
        />
        <Options
          tags={users}
          placeholder={'Users'}
          value={''}
          loading={loading}
          onChange={this.onTagAdded}
        />
        <Checkbox
          style={{ padding: 10, margin: '5% 0' }}
          value={allowPost}
          label='Allow Members To Post'
        />
        <Button style={{ padding: 10, margin: '5% 0' }} icon onClick={this.submit}>
          <Icon name="send" />
          Submit
        </Button>
      </Container>
    )
  }
}

const usersQuery = gql`
  query {
    allUsers {
      id
      email
    }
  }
`

export default graphql(usersQuery)(AddRoom)
