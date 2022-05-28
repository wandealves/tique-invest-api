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

 /* get getName(): string {
    return this.name;
  }
  set setName(name: string) {
    this.name = name;
  }

  get getCode(): string {
    return this.code;
  }
  set setCode(code: string) {
    this.code = code;
  }

  get getIconUrl(): string {
    return this.iconUrl;
  }
  set setIconUrl(iconUrl: string) {
    this.iconUrl = iconUrl;
  }*/
}
