import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TeX from './TeX'
// import LaTeX from './LaTeX.js'

const LaTeXContainer = ({ text }) => (
  <div>
    <TeX value={text} />
  </div>
)

LaTeXContainer.propTypes = {
  text: PropTypes.string,
}

export default LaTeXContainer
