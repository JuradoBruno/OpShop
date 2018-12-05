import { Component, OnInit } from '@angular/core';
import { OrderService } from 'shared/services/order.service';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { Order } from 'shared/models/order';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.css']
})
export class OrderSuccessComponent implements OnInit {

  order$;
  order: Order;
  id;

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute,
    ) { }
  
  async ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');

    this.order$ = await this.orderService.getOrderById(this.id);
    await this.order$.pipe(take(1)).subscribe(data => {
      this.order = data
    })
  }

}
