import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StudentlistComponent } from './studentlist/studentlist.component';
import { Page404Component } from './page404/page404.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { StudentRowComponent } from './studentlist/student-row/student-row.component';
import { StudentDeleteModalComponent } from './studentlist/student-delete-modal/student-delete-modal.component';
import { GenderPipe } from './pipes/gender.pipe';
import { AgePipe } from './pipes/age.pipe';

@NgModule({
  declarations: [
    AppComponent,
    StudentlistComponent,
    Page404Component,
    AddStudentComponent,
    StudentRowComponent,
    StudentDeleteModalComponent,
    GenderPipe,
    AgePipe
  ],
  entryComponents: [ StudentDeleteModalComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
