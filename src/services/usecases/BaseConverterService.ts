import { IBaseConverterService } from '@/domain/usecases'
import { IBaseConverter } from '@/services/protocols'

export class BaseConverterService implements IBaseConverterService {
  constructor (
    private readonly baseConverter: IBaseConverter
  ) {}

  convert (data: IBaseConverterService.Params): IBaseConverterService.Result {
    const { value, actualBase, desiredBases } = data
    const result = {}
    desiredBases.map(desiredBase => {
      result[`base-${desiredBase}`] = this.baseConverter.convert({ value, actualBase, desiredBase })
    })
    return result
  }
}
