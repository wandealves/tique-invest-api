export class User {
  private readonly id: number;
  private readonly name: string;
  private readonly email: string;
  private readonly cpf: string;
  private readonly avatarUrl: string;

  constructor(
    id: number,
    name: string,
    email: string,
    cpf: string,
    avatarUrl: string
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.cpf = cpf;
    this.avatarUrl = avatarUrl;
  }
}
