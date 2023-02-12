import { FilterSortValues } from '../components/ui/filter-bar/enums/filter-bar.enum';
import { Pipe, PipeTransform } from '@angular/core';
import { TaskInterface } from 'src/app/main/interfaces/course.interface';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {
  transform(taskList: TaskInterface[], param: FilterSortValues): TaskInterface[] {
    return taskList.sort(this.sortCompareFn(param));
  }

  private sortCompareFn(sortType: FilterSortValues): (a: any, b: any) => number {
    const sortOrder: number = 1;
    let property: string;

    if (sortType == FilterSortValues.Default) {
      property = 'id';
    } else if (sortType == FilterSortValues.Date) {
      property = 'timecreated';
    } else if (sortType == FilterSortValues.Name) {
      property = 'name';
    } else if(sortType == FilterSortValues.Active) {
      property = 'expires';
    }

    return (a: any, b: any) => {
        let result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        if (sortType == FilterSortValues.Active) result = (a[property] < b[property]) ? 1 : (a[property] > b[property]) ? -1 : 0;

        return result * sortOrder;
    }
  }

}
