import React, { Component } from 'react'
import { gql, graphql } from 'react-apollo'
import styled from 'styled-components';
import { Input, Icon, Button, Checkbox } from 'semantic-ui-react'
import moment from 'moment'
import { withRouter } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import Options from './commons/Options';

import 'react-datepicker/dist/react-datepicker.css';

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
    showTime: false,
    startDate: new moment(),
    endDate: moment().add(1, 'day'),
    members: [],
  }

  submit = () => {
    const { title, allowPost, members } = this.state
    const userId = this.props.userQuery.user.id
    if (!title) {
      alert('Please fill the room title')
      return
    }

    const variables = { title, allowPost, members, userId }
    console.log({ variables })
    this.props.createRoom({ variables })
      .then(res => this.props.history.replace(`/catalog/${title}`))
      .catch(error => {console.log(error);alert(error.message)})
  }

  render() {
    const { data } = this.props
    const { loading, allUsers } = data
    let users = []
    if (loading === false) {
      users = allUsers.map(user => ({ key: user.id, text: user.email, value: user.id }))
    }
    const { allowPost, title, showTime, selectedDate } = this.state
    return (
      <Container>
        <Input
          size='big'
          style={{ width: '100%', margin: '5% 0' }}
          placeholder="Section Title"
          value={title}
          onChange={e => this.setState({ title: e.target.value })}
        />
        <Options
          tags={users}
          placeholder={'Users'}
          value={''}
          loading={loading}
          onChange={(members) => this.setState({ members })}
        />
        <Checkbox
          style={{ padding: 10, margin: '5% 0' }}
          value={allowPost}
          label='Allow Members To Post'
        />
        {/* <Checkbox
          style={{ padding: 10, margin: '5% 0' }}
          value={showTime}
          onChange={() => this.setState({ showTime: !showTime })}
          label='Set'
        />
        <DatePicker
          selected={this.state.startDate}
          selectsStart
          showTimeSelect
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          onChange={this.handleChangeStart}
          timeFormat="HH:mm"
          timeIntervals={15}
          dateFormat="LLL"
          timeCaption="time"
        />

        <DatePicker
          selected={this.state.endDate}
          selectsEnd
          showTimeSelect
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          onChange={this.handleChangeEnd}
          timeFormat="HH:mm"
          timeIntervals={15}
          dateFormat="LLL"
          timeCaption="time"
        /> */}

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

const createRoom = gql`
  mutation($title: String!, $userId: ID!, $members: [ID!]) {
    createTag(
      name: $title
      subject: "Math"
      public: false
      ownerId: $userId
      membersIds: $members
    ) {
      id
    }
  }
`

const userQuery = gql`
  query {
    user {
      id
    }
  }
`

const AddRoomWithUser = graphql(userQuery, {
  name: 'userQuery',
  options: { fetchPolicy: 'network-only' },
})(AddRoom)

export default graphql(createRoom, { name: 'createRoom' })(graphql(usersQuery)(withRouter(AddRoomWithUser)))
