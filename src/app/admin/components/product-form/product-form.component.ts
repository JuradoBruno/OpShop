import { Component, OnInit, OnDestroy } from '@angular/core';
import { CategoryService } from 'shared/services/category.service';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { Observable, Subscription } from 'rxjs';
import { ProductService } from 'app/shared/services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { Product } from 'shared/models/product';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnDestroy{

  ngOnDestroy(): void {
    if(this.subscription)
    this.subscription.unsubscribe();
  }

  categories$;
  product: Product = new Product();

  id;
  products;
  test;
  subscription: Subscription;

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService, 
    private router: Router,
    private route: ActivatedRoute) {

    this.categories$ = this.categoryService.getAll();

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.subscription = this.productService.get(this.id).pipe((take(1))).subscribe(x => this.product = x)
    }

    }; 

  save(product){
    if (this.id) {
      this.productService.update(this.id, product)}
    else{
      this.productService.create(product);      
    }

    this.router.navigate(['admin/products']);
  }

  delete(){
    if (confirm('Are you sure you want to delete this product?')){
      this.productService.delete(this.id);
      this.router.navigate(['admin/products']);
    }
  }
}
