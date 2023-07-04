import { Component ,OnInit,ViewChild } from '@angular/core';
import { CartComponent } from '../cart/cart.component';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  // constructor(private cartService : CartService){}
    ngOnInit(): void {
      
    }
    onSubmit(){
      localStorage.setItem("isUserLoggedIn","false")
      alert("You have been signout")
    }
    closeNavbar(): void {
      const navbarToggler = document.querySelector('.navbar-toggler');
      const navbarCollapse = document.querySelector('.navbar-collapse');
    
      if (navbarToggler && navbarCollapse) {
        (navbarToggler as HTMLElement).click();
        (navbarCollapse as HTMLElement).classList.remove('show');
      }
    }
    
}
