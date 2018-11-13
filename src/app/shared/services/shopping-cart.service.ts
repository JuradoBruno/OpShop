import { Injectable, Output } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Product } from 'shared/models/product';
import { map, take } from 'rxjs/operators';
import { Subscription, Observable, BehaviorSubject } from 'rxjs';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { EventEmitter } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  fakeProduct: Product = new Product();
  cartId: string;
  subscription1 : Subscription
  private _isShoppingCart = new BehaviorSubject<boolean>(false);
  isShoppingCart$ = this._isShoppingCart.asObservable();


  constructor(private dbStore: AngularFirestore) {
    this.cartId = localStorage.getItem('cartId');
   }

   

  addProduct(product: Product, cartId: string){
    let object: Object;
    object = product;
    this.dbStore.collection('shopping-carts').doc(cartId).collection('products').doc(product.id).set(object);
    this.dbStore.collection('shopping-carts').doc(cartId).collection('products').doc('empty').delete();  
  }

  async removeProduct(product: Product){
    // Si le produit a pour quantité 1, le supprimer de la BDD
    // Si le produit a une quantié > 1, diminuer quantité de 1, insérer le produit.
    let newProduct: Product;
    this.GetOrCreateCartId();
    this.getProduct(this.cartId, product.id).pipe(take(1)).subscribe(p => {
      newProduct = p

      if (newProduct.quantity > 1){
        newProduct.quantity = newProduct.quantity - 1;
        this.dbStore.collection('shopping-carts').doc(this.cartId).collection('products').doc(product.id).set(newProduct);
      }
      else if (newProduct.quantity == 1)
        this.dbStore.collection('shopping-carts').doc(this.cartId).collection('products').doc(product.id).delete();
    })
  }

  async getCart(){
    if (await this.getCartId()){
      let cart = this.dbStore.collection('shopping-carts').doc(this.cartId).collection<Product>('products').valueChanges();
      return cart;
    }
    else return null;
  }

  async addToCart(product: Product){
    //Checker si panier existe, si oui, récupérer son ID, si non, le créer et récupérer son ID; OK
    //Checker si le produit est déjà dans le panier
    //S'il n'y est pas, l'insérer avec quantité = 1
    //S'il y est déjà, le sortir, augmenter sa quantité de 1 et l'insérer.

    let newProduct: Product = new Product()
    
    let cartId = await this.GetOrCreateCartId();    
    this.getProduct(cartId, product.id).pipe(take(1)).subscribe(x => {
      newProduct = x;
      // newProduct.title = x.title;
      // newProduct.id = x.id;
      // newProduct.price = x.price;
      // newProduct.category = x.category;
      // newProduct.imageUrl = x.imageUrl;
      // newProduct.quantity = x.quantity;

      if (newProduct.title != undefined){
        //Item is already in the cart
        newProduct.quantity++;
        this.addProduct(newProduct, cartId);
      }        
      else  {
        //Item is not is the cart     
        product.quantity = 1;
        this.addProduct(product, cartId);
      }
    });        
  } 

  async clearCart(cart: ShoppingCart){
    let cartId = await this.GetOrCreateCartId();
    cart.products.forEach(p => {
      this.dbStore.collection('shopping-carts').doc(cartId).collection('products').doc(p.id).delete()
    });  

  }

  private getProduct(cartId: string, productId: string){    
    return this.dbStore.collection('shopping-carts').doc(cartId)
    .collection('products')
    .doc(productId)
    .snapshotChanges().pipe(map
      (actions => {
        const data = actions.payload.data() as Product;
        const id = actions.payload.id;
        const result = {id, ...data};
        return result as Product;
      }));
  }

  private checkIfCartExists(): boolean {
    this.cartId = localStorage.getItem('cartId')
    if (this.cartId) return true;
    else return false;
  }

  private removeCartFromLocalStorage(){
    if (this.checkIfCartExists)
    localStorage.removeItem('cartId');
  }

  private async createCart(){
    let newCart = await this.dbStore.collection('shopping-carts').add({
      dateCreated: new Date().getTime()
    })
    localStorage.setItem('cartId', newCart.id);
    //Envoi un message quand le nouveau cart a été créé.
    this._isShoppingCart.next(true);
    return newCart;  
    // return result;
  }

  private getCartId(){
    if (this.checkIfCartExists()){
      return this.cartId;    
    }

    else {
      return null;
      // let newCart = await this.createCart()
      // return newCart.id
    }
    
  }

  private async GetOrCreateCartId() {
    this.cartId = localStorage.getItem('cartId');
    if (this.cartId) return this.cartId;

    let result = await this.createCart()
    
    localStorage.setItem('cartId', result.id);
    this.createProducts(result.id);
    return result.id;
  }

  private createProducts(cartId: string){
    this.dbStore.collection('shopping-carts').doc(cartId).collection('products').doc('empty').set({
      quantity : 0,
      title: '',
      price: 0,
      category: '',
      imageUrl: '',
      id: ''
    });
  }
  
}
