import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { typed } from '../paper/MathQuill'

const Input = styled.span`
  padding: 10px 10px;
  borderWidth: 0px;
`

const InputComponent = ({ id }) =>
  <Input id={id} />

InputComponent.propTypes = {
  id: PropTypes.string.isRequired,
}

export default InputComponent
