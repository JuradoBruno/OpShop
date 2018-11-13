import { Product } from "./product";
import { OnInit } from "@angular/core";
import { ShoppingCartService } from "shared/services/shopping-cart.service";

export class ShoppingCart{


    constructor(public products: Product[]){
    }
    
    //get the total quantity of products
    productQuantity(){
        let result = 0; 
        this.products.forEach(element => {
            result += element.quantity;
        })
        return result;
    }

    //get the total quantity of a product
    getQuantity(product: Product) {
        let item = this.products.find(x => x.id === product.id);
        return item? item.quantity : 0;
    }

    //get the total price of a product
    getTotalPriceItem(product: Product){
        let item = this.products.find(x => x.id === product.id);
        return item.price*item.quantity;
    }

    getTotalPrice(){
        let totalPrice = 0;
        this.products.forEach(p => {
            totalPrice += p.price*p.quantity
        });
        return totalPrice;
    }   

}