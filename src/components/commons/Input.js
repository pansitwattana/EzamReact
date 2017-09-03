import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Input = styled.span`
  borderWidth: 0px;
  font-family: 'Droid Serif', serif;
  font-family: 'Bitter', serif;
  font-size: 20x;
  color: black;
  border-color: white;
  background: white;
`

const InputComponent = ({ id }) =>
  <Input id={id} />

InputComponent.propTypes = {
  id: PropTypes.string.isRequired,
}

export default InputComponent
