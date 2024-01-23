import { type IBaseConverterService } from '#domain/usecases/index.js'
import { ok, serverError } from '#presentation/helpers/http-response.js'
import {
  type HttpResponse,
  type IController,
} from '#presentation/protocols/index.js'

export class BaseConverterController implements IController {
  constructor(private readonly baseConverterService: IBaseConverterService) {}

  async handle(request: BaseConverterController.Params): Promise<HttpResponse> {
    try {
      const bases = this.baseConverterService.convert(request)

      return ok(bases)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace BaseConverterController {
  export interface Params {
    value: string
    actualBase: number
    desiredBases: number[]
  }
}
