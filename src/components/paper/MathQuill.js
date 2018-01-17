import { KeyAction, Actions, Keys } from '../data/Keys'

let mathFields = []
let MathQuill
let MQ
const typed = (str, id) => {
  let mathField = mathFields[id]
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
      mathField.keystroke('Right')
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
  return true
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

export default { typed, getLaTeX, blur, focus, reset }
