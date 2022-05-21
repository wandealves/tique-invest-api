export class Asset {
  private readonly id: number;
  private readonly name: string;
  private readonly code: string;
  private readonly iconUrl: string;

  constructor(id: number, name: string, code: string, iconUrl: string) {
    this.id = id;
    this.name = name;
    this.code = code;
    this.iconUrl = iconUrl;
  }
}
