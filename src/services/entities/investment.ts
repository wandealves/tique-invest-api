export class Investment {
  private readonly id: number;
  private readonly total: number;
  private readonly type: string;
  private readonly countryId: number;
  private readonly userId: number;

  constructor(
    id: number,
    total: number,
    type: string,
    countryId: number,
    userId: number
  ) {
    this.id = id;
    this.total = total;
    this.type = type;
    this.countryId = countryId;
    this.userId = userId;
  }
}
