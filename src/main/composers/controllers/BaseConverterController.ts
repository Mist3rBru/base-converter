import { BaseConverter } from '@/infra/data/BaseConverter'
import { BaseConverterController } from '@/presentation/controllers'
import { BaseConverterService } from '@/services/usecases/BaseConverterService'
import { IController } from '@/presentation/protocols'

export const makeBaseConverterController = (): IController => {
  const baseConverter = new BaseConverter()
  const baseConverterService = new BaseConverterService(baseConverter)
  return new BaseConverterController(baseConverterService)
}
