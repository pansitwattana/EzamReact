const mathFields = []
let MathQuill
let MQ
const typed = (str, id) => {
  if (mathFields[id]) {
    mathFields[id].cmd(str)
  } else {
    const mathFieldSpan = document.getElementById(id)
    if(!mathFieldSpan) {
      console.error('cannot find the id in span ', id)
      return;
    }

    if (!MathQuill) {
      MathQuill = window.MathQuill
    }
    if (MathQuill) {
      if (!MQ) {
        MQ = window.MathQuill.getInterface(2)
      }
      const mathField = MQ.MathField(mathFieldSpan, {
        substituteTextarea: () => document.createElement('span'),
      })
      mathField.cmd(str)
      mathFields[id] = mathField
    }
  }
}

const getLaTeX = (id) => {
  if (!MQ) {
    return null;
  }

  const mathField = mathFields[id]
  
  if (!mathField) {
    return null;
  }

  return MQ.latex()
}

export { typed, getLaTeX }
