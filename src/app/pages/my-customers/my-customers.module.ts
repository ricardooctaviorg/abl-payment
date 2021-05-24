import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyCustomersPageRoutingModule } from './my-customers-routing.module';

import { MyCustomersPage } from './my-customers.page';
import { CommonsModule } from '../../commons/commons.module';

@NgModule({
  imports: [
    CommonModule
    , FormsModule
    , IonicModule
    , MyCustomersPageRoutingModule
    , CommonsModule
  ],
  declarations: [MyCustomersPage]
})
export class MyCustomersPageModule {}
