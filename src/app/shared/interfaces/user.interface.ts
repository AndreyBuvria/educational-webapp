import { UserType } from './../models/user.model';

export interface User {
  id: number,
  firstname: string,
  lastname: string,
  username: string,
  email: string,
  role: UserType,
  about: string,
  password: string,
  data_joined: string | null,
  timecreate: string,
  is_superuser: boolean,
  img?: string
}

export interface TokenJWT {
  access: string,
  refresh: string,
  access_token_lifetime: number,
  refresh_token_lifetime: number,
}

export interface UserLogin {
  username: string,
  password: string,
}

export interface UserSignup {
  firstname: string,
  lastname: string,
  username: string,
  role: string,
  email: string,
  about: string,
  password: string,
}
