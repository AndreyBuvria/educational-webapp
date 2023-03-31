import { CourseAccessEnum } from "../enums";

export interface CourseItem {
  readonly key: string;
  readonly id: number;
  readonly author: string;
  readonly access: CourseAccessEnum;
  readonly name: string;
  readonly description: string;
  readonly timecreated: string;
}
