enum User {
  STUDENT,
  TEACHER,
  ANONYM,
}

export type UserType = keyof typeof User;
