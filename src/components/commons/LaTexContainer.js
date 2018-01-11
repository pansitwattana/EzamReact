import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TeX from './TeX'
// import LaTeX from './LaTeX.js'

class LaTeXContainer extends Component {
  state = {
    error: null,
    text: '',
  }

  componentDidMount() {
    // let containerRef = this.containerRef
    // let childNode = containerRef.childNodes[0]
    // console.log(childNode.clientWidth, this.props.text.length)
    const { text } = this.props
    try {
      window.katex.render(text, this.latexDisplay);
    } catch (error) {
      console.error(error)
      this.setState({ error, text })
    }
  }

  render() {
    // const { text } = this.props
    // console.log(text.length)
    const { text, error } = this.state
    let latexDisplay
    if (!error) {
      latexDisplay = <div ref={(latex) => { this.latexDisplay = latex }} />
    }
    else {
      latexDisplay = <TeX value={text} />
    }
    return (
      <div>
        {latexDisplay}
      </div>
    )
  }
}

LaTeXContainer.propTypes = {
  text: PropTypes.string.isRequired,
}

export default LaTeXContainer
