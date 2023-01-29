enum CourseAccessTypesEnum {
  Public = 'Public',
  Private = 'Private'
}

export type CourseAccessType = keyof typeof CourseAccessTypesEnum;
