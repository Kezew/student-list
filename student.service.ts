import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Student,Gender } from './interfaces/student';


@Injectable({
  providedIn: 'root'
})

export class StudentService {

  readonly endPoint = 'http://pappgergely.info/progmatic/students';
  students: Student[];
  nextId = 1;
  // TODO nextId field-et kivenni

  constructor(private http: HttpClient) {
    this.students = [];

  }

  getStudents(): Promise<Student[]> {
    return new Promise<Student[]>( (resolve, reject) => {
        this.http.get(this.endPoint, { withCredentials: true } ).toPromise()  // withcredentials: true >>> süti engedély
        .then(response => {
            resolve( (response as any).students );
        }).catch(reject);
    });  // visszatérési érték egy promise lesz egy Student tömbre
    //return this.http.get(this.endPoint).toPromise() as Promise<Student[]>;  // then-elés nem itt fog történni
    // return this.students;
  }



  addStudents(s: Student): Promise<object> {
      /*
      s.id = this.nextId++;
      this.students.push(s);
      */
      // post kérés s objectet
      // a visszajövő adatot nem ellenőrizzük
      return this.http.post(this.endPoint, JSON.stringify( {student: s} ), { withCredentials: true } ).toPromise();
      // observable-t ad vissza a stringify erre toPromiose


  }

 private getStudentIndex(id: number): number {
     let idx = -1;
     this.students.forEach( (student, i) => {
         if(id === student.id ) {
             idx = i;
             return false; // forEach-ből így brékelünk ki
         }
     });
     return idx;

 }

  modifyStudents(s: Student): Promise<Student[]> {

      // kiszerveztük az id meghatározását
      // const idx = this.getStudentIndex(s.id);
      // if ( idx !== -1 ) {
      //     this.students[idx] = s;
      // }
      return new Promise( (resolve, reject) => {
          this.http.put(this.endPoint, JSON.stringify( {student: s} ),{
              params: { id : s.id.toString() },
              withCredentials: true,
          }).toPromise().then(data => {
              if ((data as any).success) {
                  resolve( (data as any).students);
              } else {
                  if ( data['error-code'] === 'not-valid-student-data' ) {
                      // vmitr elírt a felhasználó
                      // a kapott tömbbel rejecteljünk
                      reject ( data['error-infos'] ); // ezt a tömböt küldjük vissza
                  } else {
                      // valami nagyobb baj
                      reject();
                  }
              }
          }).catch( () => {reject(); });
      });
  }

  removeStudent(id: number): Promise<object> {
      // const idx = this.getStudentIndex(id);
      // if ( idx !== -1 ) {
      //     this.students.splice(idx, 1);
      // }
      return this.http.delete(this.endPoint, {
         params: {id : id.toString() },  // mivel a bemenő adatom szám ezért toString
          withCredentials: true,
      }).toPromise();
  }

  getGenderArray(): any[] {
      const enumKeys = Object.keys(Gender); // objektumból egy annak kulcsait tartalmazó tömböt ad vissza
      const genderEnum = [];
      for ( const enumKey of enumKeys) {
          genderEnum.push( { key: enumKey, value: Gender[enumKey] } );
      }
      return genderEnum;
  }

}
