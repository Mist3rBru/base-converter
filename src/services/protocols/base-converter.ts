export namespace IBaseConverter {
  export interface Params {
    value: string
    actualBase: number
    desiredBase: number
  }

  export type Result = string
}

export interface IBaseConverter {
  convert(data: IBaseConverter.Params): IBaseConverter.Result
}
