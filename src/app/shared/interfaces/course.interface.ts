export interface CourseInterface {
  id: number,
  author: string,
  name: string,
  //members: number[],
  description: string,
  timecreated: string,
}

export interface TaskInterface {
  id: number,
  related_course: CourseInterface['id'],
  name: string,
  description: string,
  expires: string | null,
  timecreated: string
}
