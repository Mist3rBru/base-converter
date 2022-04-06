import { IBaseConverter } from '@/domain/usecases'
import { Controller, HttpResponse } from '@/presentation/protocols'

export class BaseConverterController implements Controller {
  constructor (
    private readonly baseConverter: IBaseConverter
  ) {}

  async handle (request: BaseConverterController.Params): Promise<HttpResponse> {
    const { value, actualBase, desiredBase } = request
    this.baseConverter.convert(value, actualBase, desiredBase)
    return null
  }
}

export namespace BaseConverterController {
  export type Params = {
    value: string
    actualBase: number
    desiredBase: number
  }
}
