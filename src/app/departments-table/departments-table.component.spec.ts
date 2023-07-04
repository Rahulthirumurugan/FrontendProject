import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentTableComponent } from './departments-table.component';

describe('DepartmentsTableComponent', () => {
  let component: DepartmentTableComponent;
  let fixture: ComponentFixture<DepartmentTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DepartmentTableComponent]
    });
    fixture = TestBed.createComponent(DepartmentTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
