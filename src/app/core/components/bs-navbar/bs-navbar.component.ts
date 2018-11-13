import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppUser } from 'shared/models/app-user';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { AuthService } from 'shared/services/auth.service';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnDestroy, OnInit{

  appUser : AppUser;
  subscription: Subscription;
  subscription1: Subscription;
  subscription2: Subscription;
  cart: ShoppingCart = new ShoppingCart([])
  productQuantity: number = 0;
  
  constructor(private auth: AuthService, private shopService: ShoppingCartService) { 
  }

  logout(){
    this.auth.logout();
    this.appUser = null;
  }

  async ngOnInit(){
    this.subscription = this.auth.appUser$.subscribe(appUser => this.appUser = appUser);  
    
    let newCart = await this.shopService.getCart();
    if (newCart != null){
      this.subscription1 = newCart.subscribe(c => {
      this.productQuantity = 0;
      this.cart.products = c  
      this.cart.products.forEach(element => {
      this.productQuantity += element.quantity;
      });          
    });
    }

    this.subscription2 = this.shopService.isShoppingCart$.subscribe(x => {
      if (x == true) {
      this.shopService.getCart().then( c => {
        if (c != null){
          this.subscription1 = c.subscribe(c => {
          this.productQuantity = 0;
          this.cart.products = c  
          this.cart.products.forEach(element => {
          this.productQuantity += element.quantity;
          });
        });
        }  
      });     
      }
    })

  }
  
  ngOnDestroy(){
    this.subscription.unsubscribe()
    this.subscription1.unsubscribe();
    this.subscription2.unsubscribe();
  }


}
