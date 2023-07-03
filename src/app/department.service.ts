import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  deptName: string = ''

  constructor() { }

  setDepartmentName(deptName: string): void {
    this.deptName = deptName;
  }

  getDepartmentName(): string {
    return this.deptName;
  }
}
