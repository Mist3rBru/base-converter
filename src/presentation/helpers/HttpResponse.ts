import { HttpResponse } from '@/presentation/protocols'

export const ok = (body: any): HttpResponse => ({
  statusCode: 200,
  body
})

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: {
    error: `Server ${error.message}`
  }
})
