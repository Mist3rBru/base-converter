/* eslint-disable @typescript-eslint/no-explicit-any */
import { type IController } from '#presentation/protocols/index.js'
import 'graphql'

export const adaptResolver = async (
  controller: IController,
  args?: any,
  context?: any,
): Promise<any> => {
  const request = { ...args }
  const httpResponse = await controller.handle(request)

  switch (httpResponse.statusCode) {
    case 200:
    case 204:
      return httpResponse.body
    case 400:
      throw new Error(httpResponse.body.message)
    case 401:
      throw new Error(httpResponse.body.message)
    case 403:
      throw new Error(httpResponse.body.message)
    default:
      throw new Error(httpResponse.body.message)
  }
}
