import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm !: FormGroup;
  username !: string
  password !: string

  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient) { }
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]

    })
  }
  savelogindetails() {
    const username = this.loginForm.value.username ?? ''
    const password = this.loginForm.value.password ?? ''
    console.log("from save login details" + username)
    console.log("from save login details" + password)
    localStorage.setItem('username', username)
    localStorage.setItem('password', password)
  }
  getLoginDetails() {
     // Retrieve username and password from localStorage
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');
    // Check if both username and password exist
    if (username && password) {
      // Assign the values to class properties
      this.username = username;
      this.password = password
    }
    console.log('Username:', this.username);
    console.log('Password:', this.password);


  }
  validateUser(userInfo: any) {
    const url = "http://localhost:8080/users/login";
    const headers = new HttpHeaders()
      .set('Authorization', 'Basic ' + btoa(this.username + ':' + this.password));
    return this.http.post(url, userInfo, { headers });
  }

  onSubmit() {
    this.savelogindetails();
    this.getLoginDetails();
    const userInfo = {
      name: this.username,
      password: this.password
    }
    this.validateUser(userInfo).pipe(
      catchError(error => {
        const statusCode = error.status;
        if (statusCode === 401 || statusCode === 403) {
          alert("Invalid Credentials!")
        }
        if (statusCode === 200) {
          alert("You've been successfully logged in!")
          localStorage.setItem('isUserLoggedIn', 'true');
          this.router.navigate(['/home']);
        }
        return throwError(error);
      })
    ).subscribe((response: any) => {
    })

  }

  private validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field)
      if (control instanceof FormControl) {
        control.markAsDirty({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control)
      }
    })
  }
}





