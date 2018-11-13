import { Injectable, Query } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private dbStore: AngularFirestore, private shoppingCartService: ShoppingCartService) { }

  async placeOrder(order, cart){
    let orderId = await this.dbStore.collection('orders').add(Object.assign({},order));    
    this.shoppingCartService.clearCart(cart);
    return orderId;
  }

  async getAllOrders(){
    let orders = await this.dbStore.collection('orders').valueChanges();
    return orders;
  }

  async getOrdersByUser(userIdPassed: string){
    let orders = await this.dbStore.collection('orders', ref => {return ref.where('userId', '==', userIdPassed)}).valueChanges();
    return orders;
  }
}
