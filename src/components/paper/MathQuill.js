import { KeyAction, Actions, Keys } from '../data/Keys'

const mathFields = []
let MathQuill
let MQ
const typed = (str, id) => {
  const mathField = mathFields[id]
  if (mathField) {
    mathField.focus()
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
    } else if (action === Actions.CLEAR) {
      mathField.latex('')
    }
  } else {
    const mathFieldSpan = document.getElementById(id)
    if (!mathFieldSpan) {
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
      mathField.typedText(str)
      mathField.focus()
      mathFields[id] = mathField
    }
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

export default { typed, getLaTeX, blur, focus }
