export interface ValidationProps {
  messages: string[];
  name: string;
  status: number;
  hasError: boolean;
}

export interface IBaseValidation<T> {
  execute(value: T): Promise<ValidationProps>;
}
