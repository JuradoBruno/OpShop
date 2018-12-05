import { Injectable, Query } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { Order } from 'shared/models/order';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private dbStore: AngularFirestore, private shoppingCartService: ShoppingCartService) { }

  async placeOrder(order: Order, cart){
    let temp = JSON.stringify(order)
    let objectOrder = JSON.parse(temp);

    let orderId = await this.dbStore.collection('orders').add(objectOrder);
    objectOrder.id = orderId.id
    //Get the id and inject it back in the object in the DB.
    await this.dbStore.collection('orders').doc(objectOrder.id).update(objectOrder);
    this.shoppingCartService.clearCart(cart);
    return orderId;
  }

  async getAllOrders(){
    let orders = await this.dbStore.collection<Order>('orders').valueChanges();
    return orders;
  }

  async getOrdersByUser(userIdPassed: string){
    let orders = await this.dbStore.collection<Order>('orders', ref => {return ref.where('userId', '==', userIdPassed)}).valueChanges();
    return orders;
  }

  async getOrderById(orderId: string): Promise<Observable<Order>>{
    let order$ = await this.dbStore.collection('orders').doc<Order>(orderId).valueChanges();
    return order$
  }
}
