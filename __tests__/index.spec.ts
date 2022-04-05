import { Converter } from '@/index'

const makeSut = (from: number, to: number): Converter => {
  return new Converter(from, to)
}

describe('Converter', () => {
  it('should return a binary number', async () => {
    const sut = makeSut(10, 16)
    const convertedNumber = sut.convert(16)
    expect(convertedNumber).toBe('10')
  })
})
