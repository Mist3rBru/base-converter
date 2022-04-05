import { Converter } from '@/domain/usecases/Converter'
import faker from '@faker-js/faker'

export class BaseToDecimalSpy implements Converter {
  value: number
  base: number
  result = faker.datatype.number()
  convert (value: number, base: number): number {
    this.value = value
    this.base = base
    return this.result
  }
}
