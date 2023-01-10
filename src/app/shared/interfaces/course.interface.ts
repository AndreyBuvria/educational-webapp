export interface CourseInterface {
  readonly key: string,
  readonly id: number,
  author: string,
  name: string,
  description: string,
  timecreated: string,
}

export interface TaskInterface {
  readonly id: number,
  related_course: CourseInterface['id'],
  name: string,
  description: string,
  expires: Date | null,
  timecreated: Date
}
