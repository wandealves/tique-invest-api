export interface ValidationProps {
  messages: any[];
  name: string;
  status: number;
  hasError: boolean;
}

export interface IBaseValidation<T> {
  execute(value: T): Promise<ValidationProps>;
}
