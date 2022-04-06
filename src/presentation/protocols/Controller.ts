export type HttpResponse = {
  statusCode: number
  body: number
}

export interface Controller {
  handle (request: any): Promise<HttpResponse>
}
