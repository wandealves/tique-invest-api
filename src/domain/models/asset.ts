export class Asset {
  private id: number;
  private name: string;
  private code: string;
  private iconUrl: string;

  constructor(id: number, name: string, code: string, iconUrl: string) {
    this.id = id;
    this.name = name;
    this.code = code;
    this.iconUrl = iconUrl;
  }
}
