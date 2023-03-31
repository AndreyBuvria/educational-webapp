enum UserRoles {
  STUDENT,
  TEACHER,
}

export type UserType = keyof typeof UserRoles;
export interface User {
  readonly id: number,
  readonly first_name: string,
  readonly last_name: string,
  readonly username: string,
  readonly email: string,
  readonly role: UserType,
  readonly about: string,
  readonly password: string,
  readonly data_joined: Date | null,
  readonly timecreate: Date,
  readonly is_superuser: boolean,
  readonly img?: string
}

export interface UserSimple {
  username: string,
  role: UserType,
}

export interface TokenBody {
  token_type: string,
  exp: number,
  iat: number,
  jti: string,
  user_id: number,
}

export interface TokenJWT {
  access: string,
  refresh: string,
}

export interface UserLogin {
  username: string,
  password: string,
}

export interface UserSignup {
  first_name: string,
  last_name: string,
  username: string,
  role: string,
  email: string,
  about: string,
  password: string,
}
