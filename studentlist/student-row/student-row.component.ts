import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import { Gender, Student } from '../../interfaces/student';
import { StudentService } from '../../student.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StudentDeleteModalComponent } from '../student-delete-modal/student-delete-modal.component';

@Component({
  selector: '[app-student-row]',  // ez azokra vonatkozi majd akik rendelkeznek majd ilyen attribútummal
  templateUrl: './student-row.component.html',
  styleUrls: ['./student-row.component.scss']
})
export class StudentRowComponent implements OnInit {

  @Input()    // ez mondja meg, hogy ez a field az külső forrásból lesz adatból táplálva >>> SZÜLŐ KOMPONENSBŐL
  student: Student;
  @Output()
  refresh: EventEmitter<void>;
  @Output()
  refreshWithData: EventEmitter<Student[]>;
  cloneStudent: Student;
  editMode: boolean;
  genderEnum: any[];
  fieldErrors: string[];
  isSaving: boolean;


  constructor(private studentService: StudentService, private modalService: NgbModal) {
    this.editMode = false;
    this.genderEnum = this.studentService.getGenderArray();
    this.refresh = new EventEmitter;
    this.refreshWithData = new EventEmitter();
    this.fieldErrors = [];
    this.isSaving = false;
    this.student = {
      name: "",
      email: "",
      age: null,
      gender: null
    }
    // a @Input miatt már nem szükséges
    // this.student = {
    //     name: '',
    //     email: '',
    //     age: null,
    //     gender: Gender.female
    // };
  }

  ngOnInit() {
  }

  setEditMode(em: boolean) {
    this.editMode = em;
    if (em) {
      // this.cloneStudent = this.student;  >>> ez csak referenciát klónoz
      this.cloneStudent = JSON.parse(JSON.stringify(this.student));
    }
  }

  saveStudent(): void {
    // TODO hiba validációt itt meg kell csinálni !!!  >>> student sevice-ben megírtuk

    this.isSaving = true;  // ez lehetne a finally blokk után is mégis lefut előbb az aszinkron működés miatt
    this.studentService.modifyStudents(this.cloneStudent).then(data => {
      this.isSaving = false;
      this.setEditMode(false);  // promise sikeresen feloldódott
      this.refreshWithData.emit(data);  //  szól a szülőnek, hogy ezek a friss adatok, a data tartalmazza a friss adatokkal a tömböt
    }).catch(errorInfos => {
      this.isSaving = false;
      // jött-e valami ??
      if (errorInfos) {  // van e tömb ?? >>> undefined vagy tömböt várunk
        this.fieldErrors = errorInfos;

        // megmutatni a felhasználónak;
      } else {
        // szülő frissítse magát
        this.refresh.emit();
      }   // student.service-t használjuk
    }).finally(() => {
      // this.isSaving = false;
    });

  }

  deleteStudent(): void {
    // TODO confirmation
    const modalRef = this.modalService.open(StudentDeleteModalComponent);
    modalRef.componentInstance.name = this.student.name;  // ez a hallgató neve
    // milyen eredménnyel zárult a promise ??? doksit nézzed !!!
    // modalRef-ben van az open visszatérésui értéke
    modalRef.result.then(() => {
      this.studentService.removeStudent(this.student.id).then(data => {
        this.refreshWithData.emit((data as any).students);
      });
  }).catch( () => {} );  // catch-ban nem kell semmit csinálni, de üres függvényt kell megadni!!!
    /*  this.studentService.removeStudent(this.student.id).then( data => {
          // a szülő honnan tud erről, hogy töröltünk ???
          // even emmitt amire a szülő komponens tud reagállni!!!
          // this.refresh.emit(); // >>>> emit()
          this.refreshWithData.emit((data as any).students);
      }); */
  }

}
