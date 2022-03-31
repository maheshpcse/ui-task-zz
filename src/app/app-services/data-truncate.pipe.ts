import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dataTruncate'
})
export class DataTruncatePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    if (!value) {
        return value;
    } else {
        value = value.toString();
        value = value.length > 20 ? value.slice(0, 20) + `...` : value;
        return value;
    }
  }

}
