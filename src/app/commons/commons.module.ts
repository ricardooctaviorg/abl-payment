import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { HeaderMenuComponent } from './components/header-menu/header-menu.component';
import { PrettyPhonePipe } from './pipes/pretty-phone.pipe';
import { IonicModule } from '@ionic/angular';
import { IconPipe } from './pipes/icon.pipe';
import { HttpClientModule } from '@angular/common/http';

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
    , HttpClientModule
  ]
  ,exports:[
    HeaderComponent
    , HeaderMenuComponent
    , PrettyPhonePipe
    , IconPipe
  ]
})
export class CommonsModule { }
