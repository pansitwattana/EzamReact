import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import LaTeX from './LaTeX.js'

class LaTeXContainer extends Component {
  componentDidMount() {
    // let containerRef = this.containerRef
    // let childNode = containerRef.childNodes[0]
    // console.log(childNode.clientWidth, this.props.text.length)
    const { text } = this.props
    window.katex.render(text, this.latexDisplay);
  }

  render() {
    const { text } = this.props
    console.log(text.length)
    return (
      <div>
        <div ref={(latex) => { this.latexDisplay = latex }}>

        </div>
      </div>
    )
  }
}

LaTeXContainer.propTypes = {
  text: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
}

export default LaTeXContainer
