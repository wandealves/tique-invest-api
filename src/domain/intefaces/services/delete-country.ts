export interface IDeleteCountry {
  execute: (id: number) => Promise<void>;
}
