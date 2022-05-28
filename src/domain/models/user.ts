export class User {
  private id: number;
  private name: string;
  private email: string;
  private cpf: string;
  private avatarUrl: string;

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
