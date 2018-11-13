import { Component, OnInit, OnDestroy, Input, HostListener, ViewChild } from '@angular/core';
import { ProductService } from 'app/shared/services/product.service';
import { Observable, Subscription } from 'rxjs';
import { Product} from 'shared/models/product';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';



@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnDestroy{
    
  productsCollection: AngularFirestoreCollection<any>;
  products;
  productsObjects: Product[];
  filteredProducts: Product[];
  data: any;
  subscription: Subscription;
  
  constructor(private productService: ProductService) {
    // this.subscription = this.productService.getAll().subscribe(products => this.filteredProducts = products)
    this.products = this.productService.getAll().subscribe(x => {
    this.productsObjects = this.filteredProducts = x;
    });  
  } 

  filter(query: string){
    this.filteredProducts = (query)?
    this.productsObjects.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
    this.productsObjects;
  }
  
  ngOnDestroy(): void {
   this.products.unsubscribe();
  }    
}
