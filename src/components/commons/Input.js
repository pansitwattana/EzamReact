import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Input = styled.span`
  font-family: 'Droid Serif', serif;
  font-family: 'Bitter', serif;
  color: black;
  border-color: white;
  background: white;
  font-size: ${props => props.size};
  line-height: ${props => props.size};
`

const InputComponent = ({ id, focus }) => {
  // const size = focus ? '40px' : '20px'
  return (
    <Input id={id} />
  )
}

InputComponent.defaultProps = {
  focus: false,
}

InputComponent.propTypes = {
  id: PropTypes.string.isRequired,
  focus: PropTypes.bool,
}

export default InputComponent
