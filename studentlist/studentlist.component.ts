import { Component, OnInit } from '@angular/core';
import { Gender, Student } from '../interfaces/student';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-studentlist',
  templateUrl: './studentlist.component.html',
  styleUrls: ['./studentlist.component.scss']
})
export class StudentlistComponent implements OnInit {

  students: Student[];
  isLoading: boolean;

  constructor(private studentService: StudentService) {
    this.students = [];
    this.isLoading = true;
  }

  ngOnInit() {
    this.refreshList();
  }

  refreshList(newStudents?: Student[]) {
    this.isLoading = true;  
    if (newStudents) {
        this.students = newStudents;
        this.isLoading = false;
    } else {
      // this.students = this.studentService.getStudents();
      this.studentService.getStudents().then(students => {
          this.students = students;
          this.isLoading = false;
      });
    }
  }

}
  // ez csak a router bekötése előtt kellett
  // addStudent(): void {
  //     /* TODO */
  //     console.log('Új hallgató hozzáadása');
  // }

  // deleteStudent(student: Student): void {
  //     /*
  //     let idx = -1;
  //     this.students.forEach((s, i) => {
  //         if (s.id === id) {
  //             idx = i;
  //         }
  //     });
  //     */
  //     // const idx = this.students.indexOf(student);
  //     // this.students.splice(idx, 1);
  //     // service megfelő metódusának meghívása
  //     this.studentService.removeStudent(student.id);
  // }
