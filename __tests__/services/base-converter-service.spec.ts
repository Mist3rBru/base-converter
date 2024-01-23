import { type IBaseConverterService } from '#domain/usecases/index.js'
import { type IBaseConverter } from '#services/protocols/index.js'
import { BaseConverterService } from '#services/usecases/base-converter-service.js'
import { faker } from '@faker-js/faker'

interface SutTypes {
  sut: IBaseConverterService
  baseConverterSpy: BaseConverterSpy
}

const makeSut = (): SutTypes => {
  const baseConverterSpy = new BaseConverterSpy()
  const sut = new BaseConverterService(baseConverterSpy)

  return {
    sut,
    baseConverterSpy,
  }
}

const mockData = (base: number = 10): IBaseConverterService.Params => ({
  value: faker.number.hex(),
  actualBase: 16,
  desiredBases: [2, base, 16],
})

class BaseConverterSpy implements IBaseConverter {
  data: IBaseConverter.Params
  count = 0
  result = faker.number.hex()
  results: string[] = []
  convert(data: IBaseConverter.Params): IBaseConverter.Result {
    this.count++
    this.data = data
    this.results.push(this.result)

    return this.result
  }
}

describe('BaseConverterService', () => {
  it('should throw if dependency is not supported', async () => {
    const { sut } = makeSut()
    expect(() => {
      sut.convert(mockData(1))
    }).toThrow()
    expect(() => {
      sut.convert(mockData(36))
    }).toThrow()
  })

  it('should call BaseConverter with correct values', async () => {
    const { sut, baseConverterSpy } = makeSut()
    const data = mockData()
    sut.convert(data)
    expect(baseConverterSpy.count).toBe(3)
    expect(baseConverterSpy.data).toStrictEqual({
      value: data.value,
      actualBase: data.actualBase,
      desiredBase: data.desiredBases[2],
    })
  })

  it('should return bases on success', async () => {
    const { sut, baseConverterSpy } = makeSut()
    const data = mockData()
    const result = sut.convert(data)
    const expected = []

    for (const [index, base] of data.desiredBases.entries()) {
      expected.push({ base, value: baseConverterSpy.results[index] })
    }
    expect(result).toStrictEqual(expected)
  })

  it('should should throw if any dependency throws', async () => {
    const sut = new BaseConverterService({
      convert() {
        throw new Error()
      },
    })
    expect(() => {
      sut.convert(mockData())
    }).toThrow()
  })
})
