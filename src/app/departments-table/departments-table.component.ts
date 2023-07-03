import { Component, OnInit } from '@angular/core';
import { DepartmentService } from '../department.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-department-table',
  templateUrl: './departments-table.component.html',
  styleUrls: ['./departments-table.component.scss']
})
export class DepartmentTableComponent implements OnInit {
  deptName: string = '';
  departmentData!: any;
  deptData: any;


  constructor(private departmentService: DepartmentService, private http: HttpClient) { }

  ngOnInit(): void {
    this.getDepartments() 
    .subscribe((data: any) => {
      this.departmentData = data;
      console.log(data);
      console.log(this.departmentData);
  })

}

  getDepartments(){
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');
    const url = "http://localhost:8080/api/department/listdepartments";

    const headers = new HttpHeaders()
    .set('Authorization', 'Basic ' + btoa(username + ':' + password));
    return this.http.get(url, { headers });
 }
}
