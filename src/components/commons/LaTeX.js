import React, { Component } from 'react'
import PropTypes from 'prop-types'

class LaTeX extends Component {
  componentDidMount() {
    const mathFieldSpan = document.getElementById(this.props.id)
    if (window.MathQuill) {
      const MQ = window.MathQuill.getInterface(2)
      MQ.StaticMath(mathFieldSpan)
    }
  }

  render() {
    const { text, id } = this.props
    return (
      <span id={id} readOnly>{text}</span>
    )
  }
}

LaTeX.propTypes = {
  text: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
}

export default LaTeX
