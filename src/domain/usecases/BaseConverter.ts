export interface IBaseConverter {
  convert (value: string, actualBase: number, desiredBase: number): string
}
