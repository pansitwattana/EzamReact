import { Keys } from './Keys'
import { MathJaxKeys } from './MathJaxKeys'

const Math = {
  value: [
    [Keys.LOG, '<', '>', Keys.PLUSMINUS, Keys.EXP, Keys.BACKSPACE],
    [Keys.SIN, Keys.INT, '7', '8', '9', Keys.DIVIDE],
    [Keys.SQRT, Keys.DIFF, '4', '5', '6', Keys.TIMES],
    [Keys.PI, 'x', '1', '2', '3', Keys.MINUS],
    ['(', ')', '.', '0', Keys.EQUAL, Keys.PLUS],
  ],
  down: [
    [Keys.LOG_2, '<=', '>=', null, Keys.EXP, Keys.BACKSPACE],
    [Keys.COS, null, Keys.SUB_7, Keys.SUB_8, Keys.SUB_9, Keys.DIVIDE],
    [Keys.SQRT_3, null, Keys.SUB_4, Keys.SUB_5, Keys.SUB_6, Keys.TIMES],
    [null, 'y', Keys.SUB_1, Keys.SUB_2, Keys.SUB_3, Keys.MINUS],
    ['[', ']', ',', '0', Keys.NOTEQUAL, Keys.PLUS],
  ],
  up: [
    [Keys.LN, null, null, null, Keys.EXP, Keys.BACKSPACE],
    [Keys.TAN, Keys.INT, Keys.EXP_7, Keys.EXP_8, Keys.EXP_9, Keys.DIVIDE],
    [Keys.SQRT_4, null, Keys.EXP_4, Keys.EXP_5, Keys.EXP_6, Keys.TIMES],
    [null, 'z', Keys.EXP_1, Keys.EXP_2, Keys.EXP_3, Keys.MINUS],
    ['{', '}', ',', '0', Keys.NOTEQUAL, Keys.PLUS],
  ],
  symbol: [
    ['log_{10}{□}', '<', '>', '±', '□^□', '⌫'],
    ['sin(□)', '\\int', '7', '8', '9', '÷'],
    ['\\sqrt{□}', '\\frac{dy}{dx}', '4', '5', '6', '×'],
    ['\\pi', 'x', '1', '2', '3', '-'],
    ['(', ')', '.', '0', '=', '+'],
  ],
  action: Keys.ALPHABET,
}

const Alphabet = {
  value: [
    ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],
    ['i', 'j', 'k', 'l', 'm', 'n', 'o', 'p'],
    ['q', 'r', 's', 't', 'u', 'v', 'w', 'x'],
    [Keys.NUMBER, '', ' ', '', Keys.EQUAL, 'y', 'z', Keys.BACKSPACE],
  ],
  down: [
    [Keys.ALPHA, Keys.BETA, 'C', Keys.DELTA, Keys.EPSILON, 'f(', 'g(x)', 'h'],
    [Keys.IOTA, 'j', Keys.KAPPA, Keys.LAMBDA, Keys.MU, Keys.ETA, Keys.THETA, Keys.PI],
    ['q', 'r', Keys.SIGMA, Keys.THETA, 'u', 'v', Keys.OMEGA, Keys.XI],
    [Keys.NUMBER, '', ' ', '', Keys.EQUAL, 'y', Keys.ZETA, Keys.BACKSPACE],
  ],
  up: [
    ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
    ['I', 'J', 'K', 'L', 'M', 'N', 'O', 'P'],
    ['Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X'],
    [Keys.NUMBER, '', ' ', '', Keys.EQUAL, 'Y', 'Z', Keys.BACKSPACE],
  ],
  symbol: [
    ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
    ['I', 'J', 'K', 'L', 'M', 'N', 'O', 'P'],
    ['Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X'],
    ['123', ' ', '  ', '   ', '=', 'Y', 'Z', '⌫'],
  ],
  action: Keys.NUMBER,
}

const MathJax = {
  value: [
    [MathJaxKeys.LOG, '<', '>', MathJaxKeys.PLUSMINUS, MathJaxKeys.EXP, MathJaxKeys.BACKSPACE],
    [MathJaxKeys.INT, MathJaxKeys.SIN, '7', '8', '9', MathJaxKeys.DIVIDE],
    [MathJaxKeys.DIFF, MathJaxKeys.SQRT, '4', '5', '6', MathJaxKeys.TIMES],
    [MathJaxKeys.EXP_2, 'x', '1', '2', '3', MathJaxKeys.MINUS],
    ['(', ')', '.', '0', MathJaxKeys.EQUAL, MathJaxKeys.PLUS],
  ],
  down: [
    [MathJaxKeys.LOG_2, '<=', '>=', null, MathJaxKeys.EXP, MathJaxKeys.BACKSPACE],
    [null, MathJaxKeys.COS, MathJaxKeys.SUB_7, MathJaxKeys.SUB_8, MathJaxKeys.SUB_9, MathJaxKeys.DIVIDE],
    [MathJaxKeys.DIFF, MathJaxKeys.SQRT, MathJaxKeys.SUB_4, MathJaxKeys.SUB_5, MathJaxKeys.SUB_6, MathJaxKeys.TIMES],
    [MathJaxKeys.EXP_3, 'y', null, MathJaxKeys.SUB_2, MathJaxKeys.SUB_3, MathJaxKeys.MINUS],
    ['[', ']', ',', '0', MathJaxKeys.NOTEQUAL, MathJaxKeys.PLUS],
  ],
  up: [
    [MathJaxKeys.LN, null, null, null, MathJaxKeys.EXP, MathJaxKeys.BACKSPACE],
    [MathJaxKeys.INT, MathJaxKeys.COS, MathJaxKeys.EXP_7, MathJaxKeys.EXP_8, MathJaxKeys.EXP_9, MathJaxKeys.DIVIDE],
    [MathJaxKeys.DIFF, MathJaxKeys.SQRT, MathJaxKeys.EXP_4, MathJaxKeys.EXP_5, MathJaxKeys.EXP_6, MathJaxKeys.TIMES],
    [MathJaxKeys.EXP_4, 'z', null, MathJaxKeys.EXP_2, MathJaxKeys.EXP_3, MathJaxKeys.MINUS],
    ['{', '}', ',', '0', MathJaxKeys.NOTEQUAL, MathJaxKeys.PLUS],
  ],
  symbol: [
    ['log', '<', '>', '±', '^', '⌫'],
    ['int', 'sin', '7', '8', '9', '÷'],
    ['dy/dx', '√', '4', '5', '6', '×'],
    ['^2', 'x', '1', '2', '3', '-'],
    ['(', ')', '.', '0', '=', '+'],
  ],
  action: MathJaxKeys.ALPHABET,
}

const MathJaxAlphabet = {
  value: [
    ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],
    ['i', 'j', 'k', 'l', 'm', 'n', 'o', 'p'],
    ['q', 'r', 's', 't', 'u', 'v', 'w', 'x'],
    [MathJaxKeys.NUMBER, '', ' ', '', '', 'y', 'z', MathJaxKeys.BACKSPACE],
  ],
  down: [
    [MathJaxKeys.ALPHA, MathJaxKeys.BETA, 'C', MathJaxKeys.DELTA, MathJaxKeys.EPSILON, 'f(', 'g(x)', 'h'],
    [MathJaxKeys.IOTA, 'j', MathJaxKeys.KAPPA, MathJaxKeys.LAMBDA, MathJaxKeys.MU, MathJaxKeys.ETA, MathJaxKeys.THETA, MathJaxKeys.PI],
    ['q', 'r', MathJaxKeys.SIGMA, MathJaxKeys.THETA, 'u', 'v', MathJaxKeys.OMEGA, MathJaxKeys.XI],
    [MathJaxKeys.NUMBER, '', ' ', '', '', 'y', MathJaxKeys.ZETA, MathJaxKeys.BACKSPACE],
  ],
  up: [
    ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
    ['I', 'J', 'K', 'L', 'M', 'N', 'O', 'P'],
    ['Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X'],
    [MathJaxKeys.NUMBER, '', ' ', '', '', 'Y', 'Z', MathJaxKeys.BACKSPACE],
  ],
  symbol: [
    ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
    ['I', 'J', 'K', 'L', 'M', 'N', 'O', 'P'],
    ['Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X'],
    ['123', ' ', '  ', '   ', '     ', 'Y', 'Z', MathJaxKeys.BACKSPACE],
  ],
  action: MathJaxKeys.NUMBER,
}

export { Math, Alphabet, MathJax, MathJaxAlphabet }
