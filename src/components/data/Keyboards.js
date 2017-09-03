import { Keys } from './Keys'

const Math = {
  value: [
    [Keys.LOG, '<', '>', Keys.EXP, Keys.BACKSPACE, Keys.DIVIDE],
    [Keys.INT, Keys.SIN, '7', '8', '9', Keys.TIMES],
    [Keys.DIFF, Keys.SQRT, '4', '5', '6', Keys.MINUS],
    [Keys.EXP_2, 'x', '1', '2', '3', Keys.PLUS],
    [Keys.ALPHABET, '(', ')', '0', '.', Keys.EQUAL],
  ],
  symbol: [
    ['log', '<', '>', '^', '<<', '÷'],
    ['int', 'sin', '7', '8', '9', '×'],
    ['d/dx', '√', '4', '5', '6', '-'],
    ['^2', 'x', '1', '2', '3', '+'],
    ['ABC', '(', ')', '0', '.', '='],
  ],
}

const Alphabet = {
  value: [
    ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],
    ['i', 'j', 'k', 'l', 'm', 'n', 'o', 'p'],
    ['q', 'r', 's', 't', 'u', 'v', 'w', 'x'],
    [Keys.NUMBER, '', ' ', '', '', '', 'y', 'z'],
  ],
  symbol: [
    ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
    ['I', 'J', 'K', 'L', 'M', 'N', 'O', 'P'],
    ['Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X'],
    ['123', ' ', '  ', '   ', '     ', '      ', 'Y', 'Z'],
  ],
}

export { Math, Alphabet }
