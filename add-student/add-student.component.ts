import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import { Gender, Student } from '../interfaces/student';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss']
})
export class AddStudentComponent implements OnInit {

  student: Student;
  isNameInvalid: boolean;
  errors: any;
  genderEnum: any[];

  constructor(private studentService: StudentService, private router: Router) {
    this.student = {
      name: '',
      email: '',
      age: null,
      gender: Gender.female
    };
    this.isNameInvalid = false;
    this.errors = {};
    this.genderEnum = this.studentService.getGenderArray();
  }

  ngOnInit() {
  }

  add(): void {
    // console.log(this.student);

    this.checkName(); // ha bele sem kattint a névbe akkor átcsúszott volna az if-ben !!!
    this.checkEmail();

    if (!this.isNameInvalid && !this.errors.email && !this.isAgeInvalid()) {

      this.studentService.addStudents(this.student).then(() => {
        this.router.navigate(['/students']);  // hiszen ekkor már visszajött a szerverről a korrekt cucc
      });

    }
  }

  isAgeInvalid(): boolean {
    return this.student.age !== null && ! /^\d*$/.test(this.student.age.toString());  // undefined az age !!!
  }

  checkName(): void {
    this.isNameInvalid = (this.student.name === '');  // egyyenlő-e az üres string-el ???
  }

  checkEmail(): void {
    this.errors.emailEmpty = (this.student.email === '');
    const regEmail = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    this.errors.emailInvalid = !this.errors.emailEmpty && !regEmail.test(this.student.email);
    // itt kellene ellenórizni, hogy létezik-e már a mail ??
    // nem szoktuk ezt ellenórizni
    // szervertől kérdezzük !!  >>> mi van akkor, ha nem megy a szerver ??
    this.errors.email = this.errors.emailEmpty || this.errors.emailInvalid;
  }

}
