import { Component, OnInit } from '@angular/core';
import { AuthService } from 'shared/services/auth.service';
import { take } from 'rxjs/operators';
import { OrderService } from 'shared/services/order.service';
import { Order } from 'shared/models/order';
import { Observable } from 'rxjs';

@Component({
  selector: 'my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  userId: string = "";
  orders$: Observable<Order[]>;
  

  constructor(
    private authService: AuthService,
    private orderService: OrderService
    ) {}

  async ngOnInit() {
    await this.authService.user$.pipe(take(1)).subscribe(user => {
      this.userId = user.uid
    })

    this.orders$ = await this.orderService.getOrdersByUser(this.userId)
  }

}
