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

const InputComponent = ({ id, focus, error, canSimplify, simplify }) => {
  // const size = focus ? '40px' : '20px'
  const simplifyButton = canSimplify ? <Icon name='lightning' onClick={simplify} fitted color='yellow' style={{ padding: '1px 5px', float: 'right' }} /> : undefined
  const errorBox = error ? <Icon name="remove" color="red" /> : undefined
  return (
    <div> 
      <Input id={id} border="white" />
      {errorBox}
      {simplifyButton}
    </div>
  )
}

InputComponent.defaultProps = {
  focus: false,
  error: false,
  canSimplify: false,
}

InputComponent.propTypes = {
  id: PropTypes.string.isRequired,
  simplify: PropTypes.func.isRequired,
  focus: PropTypes.bool,
  error: PropTypes.bool,
  canSimplify: PropTypes.bool,
}

export default InputComponent
