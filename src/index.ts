export class Converter {
  constructor (
    private readonly fromBase: number,
    private readonly toBase: number,
    private readonly dictionary: object = {
      10: 'A',
      11: 'B',
      12: 'C',
      13: 'D',
      14: 'E',
      15: 'F'
    }) {}

  convert (n: number): string {
    let decimal = parseInt(n.toString(), this.fromBase)
    if (this.toBase === 10) {
      return decimal.toString()
    }
    const divisionRests: number[] = []
    while (decimal >= this.toBase) {
      const divisionRest = decimal % this.toBase
      divisionRests.push(divisionRest)
      decimal = (decimal - divisionRest) / this.toBase
    }
    divisionRests.push(decimal)
    let result = ''
    for (let i = divisionRests.length - 1; i >= 0; i--) {
      const index = divisionRests[i]
      if (index >= 10) {
        result += this.dictionary[index]
      } else {
        result += index
      }
    }
    return result
  }
}
