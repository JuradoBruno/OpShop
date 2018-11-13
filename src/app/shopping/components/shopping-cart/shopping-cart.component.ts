import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { Subscription, Observable } from 'rxjs';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { Product } from 'shared/models/product';

@Component({
  selector: 'shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit, OnDestroy {
  
  subscription: Subscription;
  subscription1: Subscription;
  productQuantity;
  cart: ShoppingCart = new ShoppingCart([]);

  constructor(private shopService: ShoppingCartService) {
   }

  async ngOnInit() {

    //Peuple le shopping cart de la session en cours.
    let newCart = await this.shopService.getCart();
    if (newCart != null){
      this.subscription = newCart.subscribe(c => {
        this.cart.products = c
        this.productQuantity = this.cart.productQuantity();
    });
    }

    //Permet de savoir quand un noveau cart a été créé.
    this.subscription1 = this.shopService.isShoppingCart$.subscribe(x => {
      if (x){
        this.shopService.getCart().then( p => {
            p.subscribe(p => {
              this.cart.products = p
          });
        })
      }
    })
  }

  clearCart(){    
    this.shopService.clearCart(this.cart);
  }

  ngOnDestroy(){
    if (this.subscription != undefined)
    this.subscription.unsubscribe();
    if (this.subscription1 != undefined)
    this.subscription1.unsubscribe();
  }

}
