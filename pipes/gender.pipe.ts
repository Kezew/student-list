import { Pipe, PipeTransform } from '@angular/core';

import { Gender } from '../interfaces/student';

// az így jelölt Pipe-okat nem kell importálni tehát bárhonnan elérhetőek
@Pipe({
  name: 'gender'
})
export class GenderPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return Gender[value];
  }

}
