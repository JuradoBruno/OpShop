import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'shared/models/order';
import { OrderService } from 'shared/services/order.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Product } from 'shared/models/product';
import { ShoppingCart } from 'shared/models/shopping-cart';

@Component({
  selector: 'order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  orderId: string;
  order: Order;
  order$: Observable<Order>
  cart: ShoppingCart = new ShoppingCart([])

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    ) { }

  async ngOnInit() {
    this.orderId = this.route.snapshot.paramMap.get('id');
    this.order$ = await this.orderService.getOrderById(this.orderId);
    await this.order$.pipe(take(1)).subscribe(order => {
      this.order = order;      
      this.cart.products = this.order.shoppingCart.products;
    });

  }

  

}
