export interface JwtProps {
  id: number;
  email: string;
}

export interface IJwt {
  jwt(props: JwtProps): Promise<string>;
}
