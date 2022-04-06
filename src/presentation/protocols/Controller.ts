export type HttpResponse = {
  statusCode: number
  body: any
}

export interface Controller {
  handle (request: any): Promise<HttpResponse>
}
