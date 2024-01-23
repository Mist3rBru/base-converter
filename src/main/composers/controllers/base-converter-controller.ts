import { BaseConverterController } from '#presentation/controllers/index.js'
import { type IController } from '#presentation/protocols/index.js'
import { BaseConverterService } from '#services/usecases/base-converter-service.js'
import { BaseConverter } from '#infra/data/base-converter.js'

export const makeBaseConverterController = (): IController => {
  const baseConverter = new BaseConverter()
  const baseConverterService = new BaseConverterService(baseConverter)

  return new BaseConverterController(baseConverterService)
}
