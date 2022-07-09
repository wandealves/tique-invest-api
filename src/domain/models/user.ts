export class User {
  private _id: number;
  private _name: string;
  private _email: string;
  private _cpf: string;
  private _password: string;
  private _avatarUrl: string;

  set id(value: number) {
    this._id = value;
  }

  get id(): number {
    return this._id;
  }

  set name(value: string) {
    this._name = value;
  }

  get name(): string {
    return this._name;
  }

  set email(value: string) {
    this._email = value;
  }

  get email(): string {
    return this._email;
  }

  set cpf(value: string) {
    this._cpf = value;
  }

  get cpf(): string {
    return this._cpf;
  }

  set avatarUrl(value: string) {
    this._avatarUrl = value;
  }

  get avatarUrl(): string {
    return this._avatarUrl;
  }

  set password(value: string) {
    this._password = value;
  }

  get password(): string {
    return this._password;
  }

  constructor(
    id: number,
    name: string,
    email: string,
    cpf: string,
    password: string,
    avatarUrl: string
  ) {
    this._id = id;
    this._name = name;
    this._email = email;
    this._cpf = cpf;
    this._password = password;
    this._avatarUrl = avatarUrl;
  }
}
