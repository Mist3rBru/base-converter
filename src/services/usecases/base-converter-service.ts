import { type IBaseConverterService } from '#domain/usecases/index.js'
import { type IBaseConverter } from '#services/protocols/index.js'

export class BaseConverterService implements IBaseConverterService {
  constructor(private readonly baseConverter: IBaseConverter) {}

  convert(data: IBaseConverterService.Params): IBaseConverterService.Result {
    const { value, actualBase, desiredBases } = data
    const result: object[] = []

    for (const desiredBase of desiredBases) {
      if (desiredBase === 1 || desiredBase > 35) {
        throw new Error(`Base ${desiredBase} is not supported`)
      }
      result.push({
        base: desiredBase,
        value: this.baseConverter.convert({ value, actualBase, desiredBase }),
      })
    }

    return result
  }
}
