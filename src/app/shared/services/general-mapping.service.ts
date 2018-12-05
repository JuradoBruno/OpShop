import { Injectable } from '@angular/core';
import { Product } from 'shared/models/product';

@Injectable({
  providedIn: 'root'
})
export class GeneralMappingService {

  constructor() { }

  mapOrderProductsToShoppingCart(orderProducts: any[]): Product[]{    
    return orderProducts.map(p => {
      let product = {
        id: null,
        title: p.product.title,
        price: p.product.price,
        category: '',
        imageUrl: p.product.imageUrl,
        quantity: p.quantity
      }
      return product
    })   
  }

}
