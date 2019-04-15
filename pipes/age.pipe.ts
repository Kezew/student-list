import { Pipe, PipeTransform } from '@angular/core';
import { Gender } from '../interfaces/student';

@Pipe({
  name: 'age'
})
export class AgePipe implements PipeTransform {

  transform(age: number, gender: string): string {  // a bemenő paraméter neveket átírhatom simán
      return  Gender[gender] === Gender.male ? age.toString() : this.ageInterval(age);
  }
// a pipe rendelkezhet saját metódussal is

private ageInterval(age: number): string {
    const floor = Math.floor(age / 10 ) * 10;
    const ceil = (Math.floor(age / 10 ) + 1) * 10;
    return floor + "-" + ceil;
}

}
