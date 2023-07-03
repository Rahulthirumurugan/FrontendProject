import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cartItemList : any = []
  public productList = new BehaviorSubject<any>([]);
  constructor() { }
  getProducts(){
     return this.productList.asObservable();
  }

  addtoCart(addCart :any){
    this.cartItemList.push(addCart);
    this.productList.next(this.cartItemList);
    this.getTotalPrice();
    console.log(this.cartItemList)
  }
  getTotalPrice() :number{
    let grandTotal = 0;
    this.cartItemList.map((a:any)=>{
      grandTotal +=a.total;
    })
    return grandTotal;
  }
  removeCartItem(removeProduct : any){
    this.cartItemList.map((a:any,index :any)=>{
      if(removeProduct.id===a.id){
        this.cartItemList.splice(index,1);
      }
    })
  }
  removeAllCart(){
    this.cartItemList=[]
    this.productList.next(this.cartItemList);
  }
}
