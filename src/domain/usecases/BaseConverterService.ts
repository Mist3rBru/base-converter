export namespace IBaseConverterService {
  export type Params = {
    value: string
    actualBase: number
    desiredBases: number[]
  }

  export type Result = object
}

export interface IBaseConverterService {
  convert (data: IBaseConverterService.Params): IBaseConverterService.Result
}
