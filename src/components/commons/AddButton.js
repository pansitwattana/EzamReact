import React from 'react'
import styled from 'styled-components'
import { Icon } from 'semantic-ui-react'

const Button = styled.div`
  border-radius: 3px;
  padding: 0.25em 1em;
  margin: 0 37%;
  background: transparent;
  color: rgb(150, 150, 150);
  border: 2px solid rgb(150, 150, 150);
  display: flex;
  flex-direction: column;
  align-items: center; 
`

const Text = styled.span`
  font-size: 12px;
`

const AddButton = ({ onClick }) => (
  <Button onClick={onClick}>
    <Icon name='add circle' size='large' />
    <Text>Add new</Text>
  </Button>
)

export default AddButton