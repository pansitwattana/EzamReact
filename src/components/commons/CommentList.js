import React from 'react'
import styled from 'styled-components'
import { Popup, Icon, Button } from 'semantic-ui-react'

const Comment = styled.div`
  /* display: flex;
  padding: 10px;
  flex-direction: column;
  background-color: #00FFFF;
  margin: 5px; */
  -webkit-box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 1px 5px 0 rgba(0,0,0,0.12), 0 3px 1px -2px rgba(0,0,0,0.2);
  box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 1px 5px 0 rgba(0,0,0,0.12), 0 3px 1px -2px rgba(0,0,0,0.2);
  padding: 20px;
  margin: .5rem 0 1rem 0;
  border-radius: 2px;
  background-color: #fff;
`

const CommentDate = styled.div`
  font-weight: normal;
  padding-left: 5px;
`

const CommentHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const UserInfo = styled.div`
  font-weight: bold;
  display: flex;
  flex-direction: row;
`

const diffSecond = (dt1, dt2) => {
  let diff = (dt2 - dt1) / 1000;
  return Math.abs(Math.round(diff));
}

const diffDate = (dt1, dt2) => {
  let diff = (dt2 - dt1) / 1000;
  diff /= (60 * 60 * 60);
  return Math.abs(Math.round(diff));
}

const diffMinute = (dt1, dt2) => {
  let diff = (dt2 - dt1) / 1000;
  diff /= 60;
  return Math.abs(Math.round(diff));
}

const diffHour = (dt1, dt2) => {
  let diff = (dt2 - dt1) / 1000;
  diff /= (60 * 60);
  return Math.abs(Math.round(diff));
}

const diffTime = (dt1, dt2) => {
  let diff = diffHour(dt1, dt2)
  if (diff === 0) {
    diff = diffMinute(dt1, dt2)
    if (diff === 0) {
      diff = diffSecond(dt1, dt2)
      return `${diff}s`
    }
    return `${diff}m`
  }
  else if (diff > 24) {
    diff = diffDate(dt1, dt2)
    return `${diff}d`
  }
  return `${diff}h`
}

const CommentList = ({ comments, userId, onDelete }) => (
  comments.map(comment => {
    const { id, author, text, createdAt } = comment
    const threeDot = userId === author.id ? (
      <Popup
        trigger={<Icon name='ellipsis horizontal' />}
        content={<Button onClick={() => onDelete(id)} color='red' content='Delete' />}
        on='click'
        position='top right'
      />
    ) : <div />
    return (
      <Comment key={id}>
        <CommentHeader>
          <UserInfo>
            {author.name}
            <CommentDate>{diffTime(Date.now(), Date.parse(createdAt))}</CommentDate>
          </UserInfo>
          {threeDot}
        </CommentHeader>
        {text}
      </Comment>
    )
  })
)

export default CommentList
