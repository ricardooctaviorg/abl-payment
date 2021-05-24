import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InfoUserService {

  userInfo = {
    name: ""
    , avatarId: ""
  }

  detailTitleType: string = "";

  @Output() infoMenu            : EventEmitter<any> = new EventEmitter();
  @Output() detailTypeTitle     : EventEmitter<any> = new EventEmitter();

  constructor() { }

  sendUserInfo(userInfo: any) {
    this.userInfo = userInfo;
    this.infoMenu.emit(this.userInfo);
  }

  sendDetailTypeTltle(title: string) {
    this.detailTitleType = title;
    this.detailTypeTitle.emit(this.detailTitleType);
  }

}
