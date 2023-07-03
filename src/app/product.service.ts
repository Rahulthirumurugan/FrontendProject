import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ProductsService {
  updateProduct(id: any, productFormData: { productName: any; deptName: any; }) {
    throw new Error('Method not implemented.');
  }
    baseUrl : string = 'http://localhost:8080/api/product';

    constructor(private http : HttpClient) { }


        
}




