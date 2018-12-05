import { Component, OnInit, Input } from '@angular/core';
import { Order } from 'shared/models/order';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { Product } from 'shared/models/product';

@Component({
  selector: 'order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent implements OnInit {

  @Input('order') order: Order

  cart: ShoppingCart = new ShoppingCart([]); 
  product: Product;

  constructor() { }

  ngOnInit() {
    this.cart.products = this.order.shoppingCart.products;  
  }

}
