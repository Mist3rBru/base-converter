/* eslint-disable @typescript-eslint/no-explicit-any */
import { type HttpResponse } from '#presentation/protocols/index.js'

export const ok = (body: any): HttpResponse => ({
  statusCode: 200,
  body,
})

export const serverError = (error: any): HttpResponse => ({
  statusCode: 500,
  body: {
    error: `Server ${error.message}`,
  },
})
