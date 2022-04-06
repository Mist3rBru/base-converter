import { BaseConverter } from '@/data/BaseConverter'
import { IBaseConverter } from '@/services/protocols'
import faker from '@faker-js/faker'
import bases from 'bases'

const makeSut = (): IBaseConverter => {
  return new BaseConverter()
}

const mockData = (value: number | string, actualBase: number, desiredBase: number): IBaseConverter.Params => ({
  value: value.toString(),
  actualBase: actualBase,
  desiredBase: desiredBase
})

describe('Converter', () => {
  it('should convert to to binary', async () => {
    const sut = makeSut()
    for (let i = 0; i < 20; i++) {
      const decimal = faker.datatype.number()
      const binary = bases.toBase(decimal, 2)
      const data = mockData(decimal, 10, 2)
      const result = sut.convert(data)
      expect(result).toBe(binary)
    }
  })

  it('should convert to hexadecimal', async () => {
    const sut = makeSut()
    for (let i = 0; i < 20; i++) {
      const decimal = faker.datatype.number()
      const hex = bases.toBase(decimal, 16).toUpperCase()
      const data = mockData(decimal, 10, 16)
      const result = sut.convert(data)
      expect(result).toBe(hex)
    }
  })

  it('should convert from binary', async () => {
    const sut = makeSut()
    for (let i = 0; i < 20; i++) {
      const decimal = faker.datatype.number()
      const binary = bases.toBase(decimal, 2)
      const data = mockData(binary, 2, 10)
      const result = sut.convert(data)
      expect(result).toBe(decimal.toString())
    }
  })

  it('should convert from hexadecimal', async () => {
    const sut = makeSut()
    for (let i = 0; i < 20; i++) {
      const decimal = faker.datatype.number()
      const hex = bases.toBase(decimal, 16)
      const data = mockData(hex, 16, 10)
      const result = sut.convert(data)
      expect(result).toBe(decimal.toString())
    }
  })
})
