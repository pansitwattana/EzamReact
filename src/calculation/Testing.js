import math from 'mathjs'
export default () => {
  const expr = '2x+1.5'
  math.config().number;
  const result = math.simplify(expr);
  console.log(result.toTex())


  return true
}
