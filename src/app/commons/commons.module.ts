import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { HeaderMenuComponent } from './components/header-menu/header-menu.component';
import { PrettyPhonePipe } from './pipes/pretty-phone.pipe';
import { IonicModule } from '@ionic/angular';
import { IconPipe } from './pipes/icon.pipe';

@NgModule({
  declarations: [
    HeaderComponent
    , HeaderMenuComponent
    , PrettyPhonePipe
    , IconPipe
  ],
  imports: [
    CommonModule
    , IonicModule
  ]
  ,exports:[
    HeaderComponent
    , HeaderMenuComponent
    , PrettyPhonePipe
    , IconPipe
  ]
})
export class CommonsModule { }
