import { Injectable } from '@angular/core';
import { ProductFormComponent } from '../../admin/components/product-form/product-form.component';
import { AngularFireDatabase } from 'angularfire2/database';
import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Product} from 'shared/models/product';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productsCollection: AngularFirestoreCollection<any>;
  products;
  productsObjects: Product[];
  filteredProducts: Product[];


  constructor(private dbStore: AngularFirestore) { }

  create(product){
    return this.dbStore.collection('/products').add(product);    
  }

  getAll(){
    this.productsCollection = this.dbStore.collection<Product>('products/');
    return this.productsCollection.snapshotChanges().pipe(map
      (actions => actions.map(a => {
        const data = a.payload.doc.data() as Product;
        const id = a.payload.doc.id;
        const result = {id, ...data};
        return result;
      })))
  }

  get(productId){
    // return this.product;
    return this.dbStore.collection('products').doc(productId).snapshotChanges().pipe(map
      (actions => {
        const data = actions.payload.data() as Product;
        const id = actions.payload.id;
        const result = {id, ...data};
        return result as Product;
      }));
    
    // let product = productsList.where('Title', '==', 'Bread')
    //let product = this.dbStore.doc('products').ref(x => x.where('title', '==', 'Bread'));
    // return this.dbStore.collection('products/', ref => ref.where('price', '==', '2.3'));
    
  }

  update(productId, product){
    this.dbStore.doc('/products/' + productId).update(product);
  }

  delete(productId){
    this.dbStore.doc('/products/' + productId).delete();
  }


}
