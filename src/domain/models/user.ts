export class User {
  private readonly id: number;
  private readonly name: string;
  private readonly email: string;
  private readonly avatarUrl: string;

  constructor(id: number, name: string, email: string, avatarUrl: string) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.avatarUrl = avatarUrl;
  }
}
