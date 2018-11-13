import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'shared/models/product';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent{

  @Input('product') product: Product;
  @Input('shoppingCart') shoppingCart: ShoppingCart;

  constructor(private shoppingCartService: ShoppingCartService) {
  }


  addToCart(){
    this.shoppingCartService.addToCart(this.product);    
  }

  removeProduct(){    
    this.shoppingCartService.removeProduct(this.product);    
  }

}
