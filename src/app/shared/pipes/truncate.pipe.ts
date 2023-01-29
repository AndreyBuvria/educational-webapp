import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

  transform(str: string, maxLength: number): any {
    return str.length < maxLength ? str : str.slice(0, maxLength) + '...';
  }

}
