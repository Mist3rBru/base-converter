import { BaseConverter } from '@/data/usecases/BaseConverter'
import { BaseToDecimalSpy, DecimalToBaseSpy } from '@/tests/data/mocks'

type SutTypes = {
  sut: BaseConverter
  baseToDecimalSpy: BaseToDecimalSpy
  decimalToBaseSpy: DecimalToBaseSpy
}

const makeSut = (): SutTypes => {
  const baseToDecimalSpy = new BaseToDecimalSpy()
  const decimalToBaseSpy = new DecimalToBaseSpy()
  const sut = new BaseConverter(
    baseToDecimalSpy,
    decimalToBaseSpy
  )
  return {
    sut,
    decimalToBaseSpy,
    baseToDecimalSpy
  }
}

describe('Converter', () => {
  it('should return BaseToDecimal result if desired base is 10', async () => {
    const { sut, baseToDecimalSpy } = makeSut()
    const result = sut.convert(101, 2, 10)
    expect(result).toBe(baseToDecimalSpy.result.toString())
  })

  it('should return DecimalToBase result if desired base is not 10', async () => {
    const { sut, decimalToBaseSpy } = makeSut()
    const result = sut.convert(101, 2, 16)
    expect(result).toBe(decimalToBaseSpy.result.toString())
  })

  it('should throw if any dependency throws', async () => {
    const convert = { convert () { return 10 } }
    const convertWithError = { convert () { throw new Error() } }
    const suts = [].concat(
      new BaseConverter(
        convertWithError,
        convert
      ),
      new BaseConverter(
        convert,
        convertWithError
      )
    )
    for (const sut of suts) {
      expect(() => { sut.convert(101, 2, 16) }).toThrow()
    }
  })
})
