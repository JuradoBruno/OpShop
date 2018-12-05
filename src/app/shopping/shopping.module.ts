import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './components/products/products.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { OrderSuccessComponent } from './components/orders/order-success/order-success.component';
import { OrderSummaryComponent } from './components/orders/order-summary/order-summary.component';
import { MyOrdersComponent } from './components/orders/my-orders/my-orders.component';
import { ProductFilterComponent } from './components/products/product-filter/product-filter.component';
import { ShoppingCartSummaryComponent } from './components/shopping-cart-summary/shopping-cart-summary.component';
import { ShippingFormComponent } from './components/shipping-form/shipping-form.component';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'shared/services/auth-guard.service';
import { SharedModule } from 'shared/shared.module';
import { OrderDetailComponent } from './components/orders/order-detail/order-detail.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([      
      { path: 'products', component: ProductsComponent},
      { path: 'shopping-cart', component: ShoppingCartComponent},

      { path: 'my/orders', component: MyOrdersComponent, canActivate:[AuthGuard]},
      { path: 'my/orders/:id', component: OrderDetailComponent, canActivate:[AuthGuard]},
      { path: 'check-out', component: CheckOutComponent, canActivate: [AuthGuard]},
      { path: 'order-success/:id', component: OrderSuccessComponent, canActivate:[AuthGuard]},
    ]),

  ],
  declarations: [
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    OrderSummaryComponent,
    MyOrdersComponent,
    OrderDetailComponent,    
    ProductFilterComponent,
    ShoppingCartSummaryComponent,
    ShippingFormComponent,
    
  ],
  exports: [
    ProductsComponent
  ]
})
export class ShoppingModule { }
