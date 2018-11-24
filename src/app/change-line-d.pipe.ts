import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'changeLineD'
})
export class ChangeLineDPipe implements PipeTransform {

  transform(value: any): any {
    return value.replace(/-/g,' ');
  }

}
