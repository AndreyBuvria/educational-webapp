import { FilterSortValues } from '../../content-controls';
import { Pipe, PipeTransform } from '@angular/core';
import { TaskItem } from '..';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {
  transform(taskList: TaskItem[], param: FilterSortValues): TaskItem[] {
    const newList = [...taskList];

    return this.sort(newList, param);
  }

  private sort(taskList: TaskItem[], param: FilterSortValues) {
    switch(param) {
      case FilterSortValues.Name:
        return taskList.sort((a: TaskItem, b: TaskItem) => {
          return new Intl.Collator().compare(a.name, b.name);
        });
      case FilterSortValues.Date:
        return taskList.sort((a: TaskItem, b: TaskItem) => {
          return a.timecreated < b.timecreated ? 1 : -1;
        });
      case FilterSortValues.Active:
        return taskList.sort((a: TaskItem, b: TaskItem) => {
          if (a && !b) {
            return 1;
          }

          if (!a && b) {
            return -1;
          }

          const aExpire = a.expires as Date;
          const bExpire = b.expires as Date;
          const currentDate = new Date();

          if (aExpire < currentDate && bExpire > currentDate) return 1;
          if (bExpire < currentDate && aExpire > currentDate) return -1;

          return aExpire < bExpire ? 1 : -1;
        });
      default:
       return taskList;
    }
  }

}
