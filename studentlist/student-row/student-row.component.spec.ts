import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StudentRowComponent } from './student-row.component';
import { FormsModule } from '@angular/forms';
import { Gender } from 'src/app/interfaces/student';
import { AgePipe } from 'src/app/pipes/age.pipe';
import { GenderPipe } from 'src/app/pipes/gender.pipe';

describe('StudentRowComponent', () => {
  let component: StudentRowComponent;
  let fixture: ComponentFixture<StudentRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentRowComponent, AgePipe, GenderPipe ],
      imports: [FormsModule, HttpClientTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be initialized in not editable mode', () => {
    // ne edit módban hozza létre a komponenst >>>> editMode = false -nak kell lennie
    expect(component.editMode).toBe(false);
  });

  it('should be true when call setEditMode(true)', () => {
    // meghívjuk
    component.setEditMode(true);
    expect(component.editMode).toBe(true);
  });

  it('should clone student', () => {
    component.student = {
        name: "teszt jozsi",
        age: 26,
        email: "tesztjozs@gmail.com",
        gender: Gender.male
    };
    component.setEditMode(true);
    expect(component.cloneStudent.name).toBe("teszt jozsi");
    expect(component.cloneStudent.age).toBe(26);
    expect(component.cloneStudent.email).toBe("tesztjozs@gmail.com");
    expect(component.cloneStudent.gender).toBe(Gender.male);
  });

  it('should deep clone student', () => {
      component.student = {
          name: "teszt jozsi",
          age: 26,
          email: "tesztjozs@gmail.com",
          gender: Gender.male
      };
      component.setEditMode(true);
      component.cloneStudent.name = "abc";
      component.cloneStudent.age = 18;
      component.cloneStudent.email = "jozef";
      component.cloneStudent.gender = Gender.female;
      // cloneStudent és student ténylegesen két különböző objektum-e ????
      expect(component.student.name).toBe("teszt jozsi");
      expect(component.student.age).toBe(26);
      expect(component.student.email).toBe("tesztjozs@gmail.com");
      expect(component.student.gender).toBe(Gender.male);
  });

});
