import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { Subscription } from 'rxjs';
import { ShoppingCart } from 'shared/models/shopping-cart';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})

export class CheckOutComponent implements OnInit, OnDestroy{
    
  subscription: Subscription
  cart: ShoppingCart = new ShoppingCart([])

  constructor(private shoppingCartService: ShoppingCartService){    
  }

  async ngOnInit(){
    let cart$ = await this.shoppingCartService.getCart();
    this.subscription = cart$.subscribe(products => this.cart.products = products);
  }   

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
