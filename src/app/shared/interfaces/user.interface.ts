enum UserRoles {
  STUDENT,
  TEACHER,
}

export type UserType = keyof typeof UserRoles;
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
  firstname: string,
  lastname: string,
  username: string,
  role: string,
  email: string,
  about: string,
  password: string,
}
