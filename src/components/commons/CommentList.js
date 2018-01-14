import React from 'react'
import styled from 'styled-components'

const Comment = styled.div`
  display: flex;
  padding: 10px;
  flex-direction: column;
`

const CommentDate = styled.div`
  font-weight: normal;
  padding-left: 5px;
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

const CommentList = ({ comments }) => (
  comments.map(comment => {
    const { id, author, text, createdAt } = comment
    return (
      <Comment key={id}>
        <UserInfo>
          {author.name}
          <CommentDate>{diffTime(Date.now(), Date.parse(createdAt))}</CommentDate>
        </UserInfo>
        {text}
      </Comment>
    )
  })
)

export default CommentList
