import { IBaseConverterService } from '@/domain/usecases'
import { BaseConverterController } from '@/presentation/controllers'
import { ok } from '@/presentation/helpers/HttpResponse'
import faker from '@faker-js/faker'

type SutTypes = {
  sut: BaseConverterController
  baseConverterServiceSpy: BaseConverterServiceSpy
}

const makeSut = (): SutTypes => {
  const baseConverterServiceSpy = new BaseConverterServiceSpy()
  const sut = new BaseConverterController(
    baseConverterServiceSpy
  )
  return {
    sut,
    baseConverterServiceSpy
  }
}

const mockRequest = (): BaseConverterController.Params => ({
  value: faker.datatype.hexadecimal(),
  actualBase: 16,
  desiredBases: [2, 10, 16]
})

class BaseConverterServiceSpy implements IBaseConverterService {
  data: IBaseConverterService.Params
  result = [{ 'base-16': faker.datatype.hexadecimal() }]
  convert (data: IBaseConverterService.Params): IBaseConverterService.Result {
    this.data = data
    return this.result
  }
}

describe('BaseConverterController', () => {
  it('should call BaseConverter with correct values', async () => {
    const { sut, baseConverterServiceSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(baseConverterServiceSpy.data).toEqual(request)
  })

  it('should return 200 on success', async () => {
    const { sut, baseConverterServiceSpy } = makeSut()
    const request = mockRequest()
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(ok(baseConverterServiceSpy.result))
  })

  it('should return 500 if any dependency throws', async () => {
    const sut = new BaseConverterController(
      { convert () { throw new Error() } }
    )
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse.statusCode).toBe(500)
  })
})
