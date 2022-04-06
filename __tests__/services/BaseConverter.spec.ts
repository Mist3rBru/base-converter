import { BaseConverter } from '@/services/BaseConverter'
import faker from '@faker-js/faker'
import bases from 'bases'

const makeSut = (): BaseConverter => {
  return new BaseConverter()
}

describe('Converter', () => {
  it('should convert to to binary', async () => {
    const sut = makeSut()
    for (let i = 0; i < 20; i++) {
      const decimal = faker.datatype.number()
      const binary = bases.toBase(decimal, 2)
      const result = sut.convert(decimal.toString(), 10, 2)
      expect(result).toBe(binary)
    }
  })

  it('should convert to hexadecimal', async () => {
    const sut = makeSut()
    for (let i = 0; i < 20; i++) {
      const decimal = faker.datatype.number()
      const hex = bases.toBase(decimal, 16).toUpperCase()
      const result = sut.convert(decimal.toString(), 10, 16)
      expect(result).toBe(hex)
    }
  })

  it('should convert from binary', async () => {
    const sut = makeSut()
    for (let i = 0; i < 20; i++) {
      const decimal = faker.datatype.number()
      const binary = bases.toBase(decimal, 2)
      const result = sut.convert(binary, 2, 10)
      expect(result).toBe(decimal.toString())
    }
  })

  it('should convert from hexadecimal', async () => {
    const sut = makeSut()
    for (let i = 0; i < 20; i++) {
      const decimal = faker.datatype.number()
      const hex = bases.toBase(decimal, 16)
      const result = sut.convert(hex, 16, 10)
      expect(result).toBe(decimal.toString())
    }
  })
})
