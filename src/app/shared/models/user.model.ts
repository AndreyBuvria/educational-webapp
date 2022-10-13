enum User {
  STUDENT,
  TEACHER,
}

export type UserType = keyof typeof User;
