import { IBaseConverterService } from '@/domain/usecases'
import { IController, HttpResponse } from '@/presentation/protocols'
import { ok, serverError } from '@/presentation/helpers/HttpResponse'

export class BaseConverterController implements IController {
  constructor (
    private readonly baseConverterService: IBaseConverterService
  ) {}

  async handle (request: BaseConverterController.Params): Promise<HttpResponse> {
    try {
      const bases = this.baseConverterService.convert(request)
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
