import React, { Component } from 'react';


class LaTeX extends Component {
  componentDidMount() {
    const mathFieldSpan = document.getElementById(this.props.id)
    if (window.MathQuill) {
      const MQ = window.MathQuill.getInterface(2)
      MQ.StaticMath(mathFieldSpan)
    }
    else {
      console.error('can not load MathQuill')
    }
  }

  render() {
    const { text, id } = this.props
    return (
      <span id={id} readOnly>{text}</span>
    )
  }
}

export default LaTeX
