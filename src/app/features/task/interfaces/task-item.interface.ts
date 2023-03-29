export interface TaskItem {
  readonly id: number;
  readonly related_course: number;
  readonly name: string;
  readonly description: string;
  readonly expires: Date | null;
  readonly timecreated: Date;
}
