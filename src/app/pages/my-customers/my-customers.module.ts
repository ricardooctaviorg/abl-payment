import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyCustomersPageRoutingModule } from './my-customers-routing.module';

import { MyCustomersPage } from './my-customers.page';
import { CommonsModule } from '../../commons/commons.module';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { CustomerService } from '../../services/customer.service';

@NgModule({
  imports: [
    CommonModule
    , FormsModule
    , IonicModule
    , MyCustomersPageRoutingModule
    , CommonsModule
  ],declarations: [
    MyCustomersPage
    , CustomerListComponent
  ],providers: [
    CustomerService
  ]
})
export class MyCustomersPageModule {}
