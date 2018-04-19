import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import TeX from './TeX'
// import LaTeX from './LaTeX.js'

const Container = styled.div`
  font-size: ${props => props.fontSize};
`

const LaTeXContainer = ({ text }) => {
  let fontSize
  const length = text.length
  if (length < 10) {
    fontSize = '1em'
  } else if (length < 20) {
    fontSize = '0.9em'
  } else if (length < 30) {
    fontSize = '0.8em'
  } else if (length < 40) {
    fontSize = '0.75em'
  } else {
    fontSize = '0.7em'
  }
  return (
    <Container fontSize={fontSize}>
      <TeX value={text} />
    </Container>
  )
}

LaTeXContainer.propTypes = {
  text: PropTypes.string,
}

export default LaTeXContainer
