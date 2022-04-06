import { IBaseConverterService } from '@/domain/usecases'
import { Controller, HttpResponse } from '@/presentation/protocols'
import { ok, serverError } from '@/presentation/helpers/HttpResponse'

export class BaseConverterController implements Controller {
  constructor (
    private readonly baseConverter: IBaseConverterService
  ) {}

  async handle (request: BaseConverterController.Params): Promise<HttpResponse> {
    try {
      const bases = this.baseConverter.convert(request)
      return ok(bases)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace BaseConverterController {
  export type Params = {
    value: string
    actualBase: number
    desiredBases: number[]
  }
}
