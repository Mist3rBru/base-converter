import { IBaseConverter } from '@/domain/usecases'
import { BaseConverterController } from '@/presentation/controllers'
import faker from '@faker-js/faker'

type SutTypes = {
  sut: BaseConverterController
  baseConverterSpy: BaseConverterSpy
}

const makeSut = (): SutTypes => {
  const baseConverterSpy = new BaseConverterSpy()
  const sut = new BaseConverterController(
    baseConverterSpy
  )
  return {
    sut,
    baseConverterSpy
  }
}

const mockRequest = (): BaseConverterController.Params => ({
  value: faker.datatype.hexadecimal(),
  actualBase: 16,
  desiredBase: 10
})

class BaseConverterSpy implements IBaseConverter {
  value: string
  actualBase: number
  desiredBase: number
  result = faker.datatype.hexadecimal()
  convert (value: string, actualBase: number, desiredBase: number): string {
    this.value = value
    this.actualBase = actualBase
    this.desiredBase = desiredBase
    return this.result
  }
}

describe('BaseConverterController', () => {
  it('should call BaseConverter with correct values', async () => {
    const { sut, baseConverterSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(baseConverterSpy.value).toBe(request.value)
    expect(baseConverterSpy.actualBase).toBe(request.actualBase)
    expect(baseConverterSpy.desiredBase).toBe(request.desiredBase)
  })
})
