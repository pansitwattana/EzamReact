import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Icon } from 'semantic-ui-react'

const Input = styled.span`
  font-family: 'Droid Serif', serif;
  font-family: 'Bitter', serif;
  color: black;
  border-color: ${props => props.border};
  background: white;
  font-size: ${props => props.size};
  line-height: ${props => props.size};
`

const InputComponent = ({ id, focus, error }) => {
  // const size = focus ? '40px' : '20px'
  const errorBox = error ? <Icon name="remove" color="red" /> : <div />
  return (
    <div>
      <Input id={id} border="white" />
      {errorBox}
    </div>
  )
}

InputComponent.defaultProps = {
  focus: false,
  error: false,
}

InputComponent.propTypes = {
  id: PropTypes.string.isRequired,
  focus: PropTypes.bool,
  error: PropTypes.bool,
}

export default InputComponent
