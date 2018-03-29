import React, { Component } from 'react'

const MQ = window.MathQuill.getInterface(2)
// MQ.StaticMath(problemSpan);

class StaticMath extends Component {
  componentDidMount() {
    MQ.StaticMath(this.key);
  }

  render() {
    const { children } = this.props
    return (
      <span ref={key => this.key = key}>
        {children}
      </span>
    )
  }
}

export default StaticMath
