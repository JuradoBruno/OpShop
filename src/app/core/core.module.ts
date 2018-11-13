import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsNavbarComponent } from './components/bs-navbar/bs-navbar.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SharedModule } from 'shared/shared.module';
import { RouterModule } from '@angular/router';
import { ShoppingModule } from 'app/shopping/shopping.module';

@NgModule({
  imports: [    
    SharedModule,
    ShoppingModule,
    RouterModule,
  ],
  declarations: [    
    BsNavbarComponent,
    HomeComponent,    
    LoginComponent,
  ],
  exports: [
    BsNavbarComponent,
  ]
})
export class CoreModule { }
