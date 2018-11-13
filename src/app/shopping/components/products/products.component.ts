import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from 'shared/models/product';
import { Subscription } from 'rxjs';
import { ProductService } from 'shared/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { FirebaseFirestore } from 'angularfire2';
import { AngularFirestore } from 'angularfire2/firestore';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { take } from 'rxjs/operators';
import { ShoppingCart } from 'shared/models/shopping-cart';

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnDestroy {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  category;
  subscription: Subscription
  subscription1: Subscription
  subscription2: Subscription
  isFalse: Boolean = false;
  cart: ShoppingCart = new ShoppingCart([])

  constructor(private prodService: ProductService, private route:ActivatedRoute, private shopService: ShoppingCartService)
  {    
    // this.subscription = prodService.getAll().subscribe(p => {
    // this.products = this.filteredProducts = p;
    // });

    // route.queryParamMap.subscribe(params => {
    //   this.category = params.get('category');

    //   this.filteredProducts = (this.category) ? 
    //     this.products.filter(p => p.category === this.category) : 
    //     this.products;
    // });
  }

  async ngOnInit() {

    this.populateProducts();  
    this.filterProducts(); 
    this.populateCart();
    // Recoit un message quand un cart est créé.
    this.listenToCartCreation();
  }

  private populateProducts(){
    this.subscription = this.prodService.getAll().subscribe(p => {
      this.products = this.filteredProducts = p;
      });
  }

  private filterProducts(){
    this.route.queryParamMap.subscribe(params => {
      this.category = params.get('category');
      this.applyFilter();    
    });   
  } 

  private async populateCart(){
    let newCart = await this.shopService.getCart();
    if (newCart != null){
      newCart.subscribe(x => {
        this.cart.products = x;
      })
    }
  }

  private listenToCartCreation(){
    this.subscription2 = this.shopService.isShoppingCart$.subscribe(x => {
      if (x == true){
      this.shopService.getCart().then(p => {
        if (p != null){
          p.subscribe(x => {
            this.cart.products = x;  
          })
        }
      });      
      }
    })
  }

  private applyFilter(){
    this.filteredProducts = (this.category) ? 
    this.products.filter(p => p.category === this.category) : 
    this.products;
  }

  ngOnDestroy() {
    if (this.subscription)
      this.subscription.unsubscribe();
    if (this.subscription1)
    this.subscription1.unsubscribe();
    if (this.subscription2)
    this.subscription2.unsubscribe()
  }

}
