import { KeyAction, Actions, Keys } from '../data/Keys'

let mathFields = []
let MathQuill
let MQ
const typed = (str, id) => {
  let mathField = mathFields[id]
  try {
    if (mathField) {
      const action = KeyAction(str)
      if (action === Actions.TYPE) {
        mathField.typedText(str)
      } else if (action === Actions.KEYSTROKE) {
        mathField.keystroke(str)
      } else if (action === Actions.COMMAND) {
        mathField.cmd(str)
      } else if (action === Actions.COMMANDOPEN) {
        mathField.cmd(str)
        mathField.typedText('(')
      } else if (action === Actions.NEWLINE) {
        mathField.blur()
      } else if (action === Actions.LATEX) {
        mathField.write(str)
        mathField.keystroke(Keys.RIGHT)
      } else if (action === Actions.CLEAR) {
        mathField.latex('')
      }
      mathField.focus()
    } else {
      const mathFieldSpan = document.getElementById(id)
      if (!mathFieldSpan) {
        return false;
      }
  
      if (!MathQuill) {
        MathQuill = window.MathQuill
      }
      if (MathQuill) {
        if (!MQ) {
          MQ = window.MathQuill.getInterface(2)
        }
        mathField = MQ.MathField(mathFieldSpan, {
          spaceBehavesLikeTab: true, // configurable
          substituteTextarea: () => document.createElement('span'),
        })
        mathField.latex(str)
        mathField.focus()
        mathFields[id] = mathField
      }
    }
  } finally {
    return true
  }
}

const focus = (id) => {
  typed(' ', id)
  typed(Keys.BACKSPACE, id)
}

const blur = (id) => {
  const mathField = mathFields[id]
  if (mathField) {
    mathField.blur()
  }
}

const goRight = (id) => {
  const mathField = mathFields[id]
  if (mathField) {
    mathField.moveToRightEnd()
  }
}

const setLatex = (id, latex) => {
  let mathField = mathFields[id]
  if (mathField) {
    mathField.latex(latex)
    // mathField.typedText(noSpaceLatex)
  }
  else {
    const mathFieldSpan = document.getElementById(id)
    if (!mathFieldSpan) {
      console.log('null mathquill')
      return null;
    }

    if (!MathQuill) {
      MathQuill = window.MathQuill
    }
    if (MathQuill) {
      if (!MQ) {
        MQ = window.MathQuill.getInterface(2)
      }
      let mathField = MQ.MathField(mathFieldSpan, {
        spaceBehavesLikeTab: true, // configurable
        substituteTextarea: () => document.createElement('span'),
      })
      mathField.latex(latex)
    }
  }
}

const reset = () => {
  mathFields = []
}

const getLaTeX = (id) => {
  if (!MQ) {
    return null;
  }

  const mathField = mathFields[id]
  if (!mathField) {
    return null;
  }

  return mathField.latex()
}

export default { typed, getLaTeX, blur, focus, reset, goRight, setLatex }
