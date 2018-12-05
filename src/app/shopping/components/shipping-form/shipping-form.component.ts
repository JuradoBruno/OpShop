import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Order } from 'shared/models/order';
import { Subscription } from 'rxjs';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { AuthService } from 'shared/services/auth.service';
import { OrderService } from 'shared/services/order.service';
import { Router } from '@angular/router';
import { Shipping } from 'shared/models/shipping';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy{

  @Input('cart') cart: ShoppingCart;
  
  shipping: Shipping = {
    name:'',    
    addressLine1: '',
    addressLine2: '',
    city: ''
  };
  
  UserSubscription: Subscription;
  userId: string;

  constructor( 
    private authService: AuthService,
    private orderService: OrderService,
    private router: Router
    ){
  }

  async ngOnInit(){
    this.UserSubscription = this.authService.user$.subscribe(user => this.userId = user.uid)
  }   

  async placeOrder() {
    let order = new Order(this.userId, this.shipping, this.cart);
    console.log(order);
    let result = await this.orderService.placeOrder(order, this.cart);

    this.router.navigate(['/order-success', result.id])
  }
  
  ngOnDestroy(){
    this.UserSubscription.unsubscribe();
  }

}


