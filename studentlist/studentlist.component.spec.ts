import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AgePipe } from 'src/app/pipes/age.pipe';
import { GenderPipe } from 'src/app/pipes/gender.pipe';
import { StudentlistComponent } from './studentlist.component';
import { StudentRowComponent } from './student-row/student-row.component';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('StudentlistComponent', () => {
  let component: StudentlistComponent;
  let fixture: ComponentFixture<StudentlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentlistComponent, StudentRowComponent, AgePipe, GenderPipe ],
      imports: [FormsModule, HttpClientTestingModule]
  }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title in a h1 tag', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Hallgatói nyilvántartás');
  });

});
