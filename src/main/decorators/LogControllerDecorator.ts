import { IController, HttpResponse } from '@/presentation/protocols'
import { ILogErrorRepository } from '@/services/protocols'

export class LogControllerDecorator implements IController {
  constructor (
    private readonly controller: IController,
    private readonly logDecoratorService: ILogErrorRepository
  ) {}

  async handle (request: any): Promise<HttpResponse> {
    const httpResponse = await this.controller.handle(request)
    if (httpResponse.statusCode === 500) {
      await this.logDecoratorService.log(httpResponse.body.stack)
    }
    return httpResponse
  }
}
