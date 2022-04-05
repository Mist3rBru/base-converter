import { Converter } from '@/domain/usecases/Converter'

export class BaseConverter {
  constructor (
    private readonly baseToDecimal: Converter,
    private readonly decimalToBase: Converter
  ) {}

  convert (n: number, actualBase: number, desiredBase: number): string {
    const decimal = this.baseToDecimal.convert(n, actualBase)
    if (desiredBase === 10) return decimal.toString()
    const result = this.decimalToBase.convert(decimal, desiredBase)
    return result.toString()
  }
}
