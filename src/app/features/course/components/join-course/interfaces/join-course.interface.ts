import { JoinCourseStatusResponse } from "../enums/join-response.enum";

export interface JoinCourseResponse<T> {
  status: JoinCourseStatusResponse,
  response: T
}
