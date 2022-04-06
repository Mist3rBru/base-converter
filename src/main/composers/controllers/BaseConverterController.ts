import { BaseConverter } from '@/data/BaseConverter'
import { BaseConverterController } from '@/presentation/controllers'
import { BaseConverterService } from '@/services/usecases/BaseConverterService'
import { makeLogControllerDecorator } from '@/main/composers/decorators'
import { IController } from '@/presentation/protocols'

export const makeBaseConverterController = (): IController => {
  const baseConverter = new BaseConverter()
  const baseConverterService = new BaseConverterService(baseConverter)
  const controller = new BaseConverterController(baseConverterService)
  return makeLogControllerDecorator(controller)
}
