import { IBaseConverter } from '@/services/protocols'

export class BaseConverter implements IBaseConverter {
  convert (data: IBaseConverter.Params): IBaseConverter.Result {
    const { value, actualBase, desiredBase } = data
    const decimal = this.fromBase(value, actualBase)
    if (desiredBase === 10) return decimal
    const result = this.toBase(decimal, desiredBase)
    return result
  }

  private fromBase (value: string, actualBase: number): string {
    const dictionary = this.setupDictionary()
    const charList = value.split('')
    let decimal = 0
    charList.map((letter, index) => {
      const value: number = parseInt(letter) || dictionary[letter]
      const exponent = charList.length - index - 1
      decimal = decimal + (value * Math.pow(actualBase, exponent))
    })
    return decimal.toString()
  }

  private toBase (value: string, desiredBase: number): string {
    const dictionary = this.setupDictionary()
    let decimal = parseInt(value)
    const chars: string[] = []
    while (decimal > 0) {
      const divisionRest = decimal % desiredBase
      chars.push(dictionary[divisionRest] || divisionRest)
      decimal = Math.floor(decimal / desiredBase)
    }
    return chars.reverse().join('')
  }

  private setupDictionary (): object {
    const dictionary = { 0: 0 }
    const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
    upperCase.map((letter, index) => {
      const n = 10 + index
      dictionary[n] = letter
      dictionary[letter] = n
      dictionary[letter.toLowerCase()] = n
    })
    return dictionary
  }
}
