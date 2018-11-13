import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'shared/models/product';
import { ShoppingCartService } from 'app/shared/services/shopping-cart.service';
import { ShoppingCart } from 'shared/models/shopping-cart';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent{

  @Input('product') product: Product;
  @Input('showActions') showActions: boolean = true;
  @Input('shoppingCart') shoppingCart: ShoppingCart;

  quantity;

  constructor(private shoppingCartService: ShoppingCartService) {
  }

  addToCart(){
    this.shoppingCartService.addToCart(this.product);    
  }

}
