import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddStudentComponent } from './add-student/add-student.component';
import { Page404Component } from './page404/page404.component';
import { StudentlistComponent } from './studentlist/studentlist.component';

const routes: Routes = [
    { path: '', redirectTo: 'students', pathMatch: 'full' },
    { path: 'students', component: StudentlistComponent },
    { path: 'students/add', component: AddStudentComponent },
    /* { path: '**', redirectTo: 'students' }, */
    { path: '**', component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
