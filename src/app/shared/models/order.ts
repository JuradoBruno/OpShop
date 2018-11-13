import { ShoppingCart } from "./shopping-cart";

export class Order{

    datePlaced;
    products: any[];

    private getDate(){
      let today = new Date();
      let day;
      let month;
      let year
      let dd = today.getDate();
      day = dd
      let mm = today.getMonth()+1;
      month = mm //January is 0!

      year = today.getFullYear();
      if(dd<10){
        day ='0'+dd;
      } 
      if(mm<10){
        month='0'+mm;
      } 
      let todayDate = day+'/'+month+'/'+year;
      return todayDate;
    }

      constructor(public userId: string, public shipping: any, shoppingCart: ShoppingCart){
        this.datePlaced = this.getDate();   

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