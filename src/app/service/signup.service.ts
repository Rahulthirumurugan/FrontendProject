import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  baseUrl="http://localhost:8080/api/signup"

  constructor(private http:HttpClient) { }

  getAllDetails(){
    return this.http.get(this.baseUrl);
  }
}
