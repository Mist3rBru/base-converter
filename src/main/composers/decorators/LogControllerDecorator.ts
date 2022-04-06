import { LogRepository } from '@/infra/mongodb'
import { LogControllerDecorator } from '@/main/decorators'
import { IController } from '@/presentation/protocols'

export const makeLogControllerDecorator = (controller: IController): LogControllerDecorator => {
  const logErrorRepository = new LogRepository()
  return new LogControllerDecorator(controller, logErrorRepository)
}
