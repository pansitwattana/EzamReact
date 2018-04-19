import React from 'react'
import styled from 'styled-components'
import propTypes from 'prop-types'
import { Icon } from 'semantic-ui-react'

const Button = styled.div`
  border-radius: 3px;
  padding: 0.25em 1em;
  margin: 5px 37%;
  background: transparent;
  color: rgb(150, 150, 150);
  border: 2px solid rgb(150, 150, 150);
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  text-align: center; 
`

const Text = styled.span`
  font-size: 12px;
`

const AddButton = ({ onClick, children }) =>
  <Button onClick={onClick}>
    <Icon name="add circle" size="large" />
    <Text>{children}</Text>
  </Button>

AddButton.propTypes = {
  onClick: propTypes.func.isRequired,
}

export default AddButton
