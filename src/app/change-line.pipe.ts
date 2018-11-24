import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'changeLine'
})
export class ChangeLinePipe implements PipeTransform {

  transform(value: any): any {
    return value.replace(/-/g,' ');
  }
}
