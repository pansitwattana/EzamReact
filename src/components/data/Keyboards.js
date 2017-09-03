import { Keys } from './Keys'

const Math = {
  value: [
    ['1', Keys.LOG, Keys.ALPHABET, Keys.SIN, Keys.BACKSPACE, Keys.DIVIDE],
    ['1', Keys.SQRT, '7', '8', '9', Keys.TIMES],
    ['1', Keys.EXP, '4', '5', '6', Keys.MINUS],
    ['0', 'x', '1', '2', '3', Keys.PLUS],
    ['1', '(', ')', '0', '.', Keys.EQUAL],
  ],
  symbol: [
    ['1', 'Log', 'ABC', 'Sin', '<<', '÷'],
    ['1', '√', '7', '8', '9', '×'],
    ['1', '^', '4', '5', '6', '-'],
    ['0', 'x', '1', '2', '3', '+'],
    ['1', '(', ')', '0', '.', '='],
  ],
}

const Alphabet = {
  value: [
    ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
    ['I', 'J', 'K', 'L', 'M', 'N', 'O', 'P'],
    ['Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X'],
    [Keys.NUMBER, '', '', '', '', '', 'Y', 'Z'],
  ],
}

export { Math, Alphabet }
