import { Component, OnInit } from '@angular/core';
import { OrderService } from 'app/shared/services/order.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {

  orders$: Observable<any>;
  orderByUser$: Observable<any>;

  constructor(private orderService: OrderService) {

  }

  async ngOnInit() {
    this.orders$ = await this.orderService.getAllOrders();    
  }

  async getOrderByUser(){
    this.orderByUser$ = await this.orderService.getOrdersByUser('oZNV5PBkeua3DaIhTewQc6GwFur2');
  }

}
