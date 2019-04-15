import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-student-delete-modal',
  templateUrl: './student-delete-modal.component.html',
  styleUrls: ['./student-delete-modal.component.scss']
})
export class StudentDeleteModalComponent implements OnInit {

@Input()
name: string;   // ez lesz a adott hallgatóm neve a student-row ból !!!

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
