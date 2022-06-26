import { ValueObject } from "./value-object";

export interface TotalProps {
  total: number;
  quantity: number;
  items: Item[];
}

export interface Item {
  code: string;
  total: number;
  quantity: number;
}

export class Total extends ValueObject<TotalProps> {
  private readonly total: number;
  private readonly quantity: number;
  private readonly items: Item[];

  private constructor(props: TotalProps) {
    super(props);

    this.total = props.total;
    this.quantity = props.quantity;

    this.items = props.items;
  }

  public static create(props: TotalProps): Total {
    return new Total(props);
  }
}
