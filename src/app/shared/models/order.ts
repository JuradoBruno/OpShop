import { ShoppingCart } from "./shopping-cart";
import { Shipping } from "./shipping";

export class Order{
  
  id: string = '';
  datePlaced;
  products: any[];
  
  constructor(
    public userId: string, 
    public shipping: Shipping,
    public shoppingCart: ShoppingCart
    ){
    this.datePlaced = this.getDate();    
    
    if (this.products){
      this.products = shoppingCart.products.map(i => {
        return {
          product:{
            title: i.title,
            imageUrl: i.imageUrl,
            price: i.price,
          },
          quantity: i.quantity,
          totalPrice: i.price*i.quantity
        }
      })
    }
  }
  
  private getDate(){
    let today = new Date();
    let day;
    let month;
    let year;
    let minute;
    let dd = today.getDate();
    day = dd
    let mm = today.getMonth()+1;
    month = mm //January is 0!
    let hour = today.getHours();
    let mn = today.getMinutes()
    minute = mn;     

    year = today.getFullYear();
    if(dd<10){
      day = '0'+dd;
    } 
    if(mm<10){
      month = '0'+mm;
    }
    if (mn<10)
      minute = '0'+ mn
    let todayDate = day +'/'+ month +'/'+ year +' '+ hour +":"+ minute;
    return todayDate;
  }   
}