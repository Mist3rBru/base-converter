import { type IBaseConverterService } from '#domain/usecases/index.js'
import { BaseConverterController } from '#presentation/controllers/index.js'
import { ok } from '#presentation/helpers/index.js'
import { faker } from '@faker-js/faker'

interface SutTypes {
  sut: BaseConverterController
  baseConverterServiceSpy: BaseConverterServiceSpy
}

const makeSut = (): SutTypes => {
  const baseConverterServiceSpy = new BaseConverterServiceSpy()
  const sut = new BaseConverterController(baseConverterServiceSpy)

  return {
    sut,
    baseConverterServiceSpy,
  }
}

const mockRequest = (): BaseConverterController.Params => ({
  value: faker.number.hex(),
  actualBase: 16,
  desiredBases: [2, 10, 16],
})

class BaseConverterServiceSpy implements IBaseConverterService {
  data: IBaseConverterService.Params
  result = [{ 'base-16': faker.number.hex() }]
  convert(data: IBaseConverterService.Params): IBaseConverterService.Result {
    this.data = data

    return this.result
  }
}

describe('BaseConverterController', () => {
  it('should call BaseConverter with correct values', async () => {
    const { sut, baseConverterServiceSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(baseConverterServiceSpy.data).toStrictEqual(request)
  })

  it('should return 200 on success', async () => {
    const { sut, baseConverterServiceSpy } = makeSut()
    const request = mockRequest()
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toStrictEqual(ok(baseConverterServiceSpy.result))
  })

  it('should return 500 if any dependency throws', async () => {
    const sut = new BaseConverterController({
      convert() {
        throw new Error()
      },
    })
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse.statusCode).toBe(500)
  })
})
