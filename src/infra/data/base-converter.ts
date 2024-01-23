/* eslint-disable security/detect-object-injection */
import { type IBaseConverter } from '#services/protocols/index.js'

export class BaseConverter implements IBaseConverter {
  convert(data: IBaseConverter.Params): IBaseConverter.Result {
    const { value, actualBase, desiredBase } = data
    const decimal = this.fromBase(value, actualBase)

    if (desiredBase === 10) return decimal
    const result = this.toBase(decimal, desiredBase)

    return result
  }

  private fromBase(value: string, actualBase: number): string {
    const dictionary = this.setupDictionary()
    const charList = [...value]
    let decimal = 0

    for (const [index, letter] of charList.entries()) {
      const int: number =
        Number.parseInt(letter) || Number.parseInt(dictionary[letter])
      const exponent = charList.length - index - 1
      decimal = decimal + int * Math.pow(actualBase, exponent)
    }

    return decimal.toString()
  }

  private toBase(value: string, desiredBase: number): string {
    const dictionary = this.setupDictionary()
    let decimal = Number.parseInt(value)
    const chars: string[] = []

    while (decimal > 0) {
      const divisionRest = decimal % desiredBase
      chars.push(dictionary[divisionRest] || String(divisionRest))
      decimal = Math.floor(decimal / desiredBase)
    }

    return chars.reverse().join('')
  }

  private setupDictionary(): Record<string | number, string> {
    const dictionary: Record<string | number, string> = {}
    // eslint-disable-next-line no-secrets/no-secrets
    const upperCase = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ']

    for (const [index, letter] of upperCase.entries()) {
      const n = 10 + index
      dictionary[n] = letter
      dictionary[letter] = String(n)
      dictionary[letter.toLowerCase()] = String(n)
    }

    return dictionary
  }
}
