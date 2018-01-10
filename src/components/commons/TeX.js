import React, { Component } from 'react'
import PropTypes from 'prop-types'

let MathJax

class TeX extends Component {
  componentWillMount() {
    if (!window.MathJax) {
      console.error('No MathJax package')
      return
    }
    MathJax = window.MathJax
    MathJax.Hub.Config({
      tex2jax: this.props.tex2jax,
      showMathMenu: this.props.showMathMenu,
      showMathMenuMSIE: this.props.showMathMenuMSIE,
    });
  }

  componentDidMount() {
    MathJax.Hub.Queue(['Typeset', MathJax.Hub, this.node])
  }

  componentDidUpdate() {
    MathJax.Hub.Queue(['Typeset', MathJax.Hub, this.node])
    // if (MathJax) {
    //   setTimeout(() => {
    //     MathJax.Hub.Queue(['Typeset', MathJax.Hub, this.node])
    //   }, 150); 
    // }
  }

  setNode = (node) => {
    this.node = node;
  }

  render() {
    return (
      <div
        className={this.props.className}
        id="MathJax-TeX"
        ref={this.setNode}
        style={this.props.style}
      >
        {`${this.props.value}`}
      </div>
    );
  }
}

TeX.defaultProps = {
  showMathMenu: false,
  showMathMenuMSIE: false,
  tex2jax: { inlineMath: [['$', '$'], ['\\(', '\\)']] },
}

TeX.propTypes = {
  className: PropTypes.string,
  showMathMenu: PropTypes.bool,
  showMathMenuMSIE: PropTypes.bool,
  style: PropTypes.object,
  tex2jax: PropTypes.object,
  value: PropTypes.string.isRequired,
}

export default TeX
