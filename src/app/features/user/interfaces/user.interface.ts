import { UserRolesEnum } from "../enums";

export interface User {
  readonly id: number,
  readonly first_name: string,
  readonly last_name: string,
  readonly username: string,
  readonly email: string,
  readonly role: UserRolesEnum,
  readonly about: string,
  readonly password: string,
  readonly data_joined: Date | null,
  readonly timecreate: Date,
  readonly is_superuser: boolean,
  readonly img?: string
}

export interface UserLogin {
  readonly username: string,
  readonly password: string,
}

export interface UserSignup {
  readonly first_name: string,
  readonly last_name: string,
  readonly username: string,
  readonly role: string,
  readonly email: string,
  readonly about: string,
  readonly password: string,
}
