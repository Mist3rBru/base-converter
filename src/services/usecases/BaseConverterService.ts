import { IBaseConverterService } from '@/domain/usecases'
import { IBaseConverter } from '@/services/protocols'

export class BaseConverterService implements IBaseConverterService {
  constructor (
    private readonly baseConverter: IBaseConverter
  ) {}

  convert (data: IBaseConverterService.Params): IBaseConverterService.Result {
    const { value, actualBase, desiredBases } = data
    const result: object[] = []
    desiredBases.map(desiredBase => {
      if (desiredBase === 1 || desiredBase > 35) {
        throw new Error(`Base ${desiredBase} is not supported`)
      }
      result.push({
        base: desiredBase,
        value: this.baseConverter.convert({ value, actualBase, desiredBase })
      })
    })
    return result
  }
}
