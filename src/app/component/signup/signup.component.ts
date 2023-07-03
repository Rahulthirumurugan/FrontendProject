import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup , Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignupService } from 'src/app/service/signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  username : string ="";
  email : string ="";
  password : string ="";
  confirmpassword : string="";
   signUpForm !: FormGroup;

  constructor(private fb :FormBuilder,private http:HttpClient,private router :Router){}
  save(){
    this.register();
  }
  register(){
    const signupData = {
      username : this.signUpForm.value.username,
      email : this.signUpForm.value.email,
      password : this.signUpForm.value.password,
      confirmpassword : this.signUpForm.value.confirmpassword,
      roles : "ROLE_USER"
    }
    console.log(signupData)
    // checking for same passwords

    if(this.password != this.confirmpassword){
      alert("Your passwords do not match!")
    }else{
      console.log(signupData)
      this.adduser(signupData).subscribe({
        next: (v) => console.log('User added successfully'),
        error: (err) => console.log('Error adding user')
      })
      alert("Registered Successfully")
      this.router.navigate(['/login'])
    }

   
  }
  adduser(signupData :any){
    return this.http.post("http://localhost:8080/users/new",signupData)
  }
  ngOnInit(): void {
       this.signUpForm = this.fb.group({
       username : ['',Validators.required],
       email : ['',Validators.email],
       password : ['',Validators.required],
       confirmpassword :['',Validators.required],
       roles :[]
  });

}

passwordMatchValidator(formGroup: FormGroup) {
  const password = formGroup.get('password')?.value;
  const confirmPassword = formGroup.get('confirmpassword')?.value;
  if (password !== confirmPassword) {
    formGroup.get('confirmpassword')?.setErrors({ passwordMismatch: true });
  } else {
    formGroup.get('confirmpassword')?.setErrors(null);
  }
}
validateConfirmPassword(): void {
  this.signUpForm.get('password')?.updateValueAndValidity();
  this.signUpForm.get('confirmpassword')?.updateValueAndValidity();
}

private validateAllFormFields(formGroup: FormGroup) {
  Object.keys(formGroup.controls).forEach(field => {
    const control = formGroup.get(field);
    if (control instanceof FormControl) {
      control.markAsDirty({ onlySelf: true });
    } else if (control instanceof FormGroup) {
      this.validateAllFormFields(control);
    }
  });
}
}
