import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DepartmentService } from '../department.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductsService } from '../product.service';


@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.scss']
})
export class ProductsTableComponent {
  productName: string = "";
  department : string = "";
  productData!:any;

  productForm!: FormGroup;
  departmentData: any;
  productsData!: any;
  deptName: any;
  deleteProductValue :number = 1;                
  products: any;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private departmentService: DepartmentService,
    private productsService : ProductsService
  ) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      productId:[''],
      productName: [''],
      deptName: ['']
    });
    this.getProducts() 
    .subscribe((data: any) => {
      this.productData = data;
      console.log(this.productData);

    });
  }
  
  updateProduct(item : any){
    console.log(item);
    let productName = window.prompt('Enter the product name')
    let deptName = window.prompt('Enter the department name ')
    
    let oldProductId = item.productId
    item.productName = productName;
    item.deptName = deptName;
    console.log(productName)
    console.log(deptName)
    const productFormData = {
      productName: productName,
      deptName:deptName,
    };
    console.log(productFormData.productName)
    console.log(productFormData.deptName)
    const username =localStorage.getItem('username');
    const password = localStorage.getItem('password');
    const url ="http://localhost:8080/api/product";
    const headers = new HttpHeaders()
    .set('Authorization', 'Basic ' + btoa(username + ':' + password));
    return this.http.post(url+'/'+ oldProductId, productFormData, { headers }).subscribe({
      next: (v) => console.log('Product updated successfully'),
      error: (err) => console.log('Error updatibg product'),
      
  });
  }
  deleteProductName:string=""

  deleteProduct(item : any){   
     this.deleteProductName = item.productName;
     console.log(this.deleteProductName)
    this.deleteProductValue=0;
    const username =localStorage.getItem('username');
    const password = localStorage.getItem('password');
    const url ="http://localhost:8080/api/product";
    const headers = new HttpHeaders()
    .set('Authorization', 'Basic ' + btoa(username + ':' + password));
    return this.http.delete(url+'/'+this.deleteProductName, { headers }).subscribe({

      next: (v) => console.log('Product deleted successfully'),
      error: (err) => console.log('Error deleting product'),
      
  });


  }
  getProducts(){
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');
    const url = "http://localhost:8080/api/product/listproducts";

    const headers = new HttpHeaders()
    .set('Authorization', 'Basic ' + btoa(username + ':' + password));
    return this.http.get(url, { headers });
 }
 addProducts(){
  console.log("Inside add products method")
  alert("Product added successfully")
  const productName = this.productForm.value.productName;
    const deptName = this.productForm.value.deptName;
    console.log(productName + " "+deptName)
    const data = {
      productName: productName,
      deptName: deptName,
      deleteValue:this.deleteProductValue,
    }; 
    console.log(data)
  const username =localStorage.getItem('username');
  const password = localStorage.getItem('password');
  const url ="http://localhost:8080/api/product";
  const headers = new HttpHeaders()
  .set('Authorization', 'Basic ' + btoa(username + ':' + password));
  return this.http.post(url,data, { headers }).subscribe({
         next: (v) => console.log('Product added successfully'),
         error: (err) => console.log('Error adding product'),
     });

 }
 
}
