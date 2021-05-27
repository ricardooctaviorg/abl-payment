import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { User } from '../commons/interfaces/user';
import { Observable } from 'rxjs';
import { StorageService } from '../commons/services/storage.service';
import { NavController } from '@ionic/angular';
import { InfoUserService } from '../commons/services/info-user.service';
import { environment } from '../../environments/environment';

const GATEWAY                   = environment.gateway;
const RESOURCE_BASE             = environment.securityResource;
const KEY_TOKEN                 = environment.keyToken;

const RESOURCE_CREATE           = "/userRegister";
const RESOURCE_UPDATE           = "/userUpdate";

const RESOURCE_LOGIN            = "/login";
const RESOURCE_EXISTUSERBYROLE  = "existUserbyRole"

const ENDPOINT_CREATE 
  = GATEWAY
  + RESOURCE_BASE + RESOURCE_CREATE ;

const ENDPOINT_LOGIN 
  = GATEWAY
  + RESOURCE_BASE + RESOURCE_LOGIN ;

const ENDPOINT_UPDATE 
  = GATEWAY
  + RESOURCE_BASE + RESOURCE_UPDATE ;

const VERIFYTOKEN 
  = GATEWAY
  + RESOURCE_BASE ;

const ENDPOINT_EXISTUSERBYROLE 
  = GATEWAY
  + RESOURCE_BASE + RESOURCE_EXISTUSERBYROLE;

const headers = new HttpHeaders()
  .set('Contet-Type', 'application/json');

const httpOptions = {
  headers
};

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  token         : string  = null;
  userId        : string  = null;
  name          : string  = null;
  avatar        : string  = null;
  user          : User    = {};

  constructor(private httpClient  : HttpClient
    , private storageService      : StorageService
    , private navController       : NavController
    , private infoUserService     : InfoUserService) { }

  public registerAgent(user: User): Promise<number> {
    return new Promise(
      resolve => {
        this.httpClient.post<any>(`${ENDPOINT_CREATE}`, user, httpOptions).subscribe(
          async (data) => {
            if (data.success) {
              await this.saveToken(data.token);
              await this.saveUserId(data.user.userId);
              await this.saveName(data.user.name);
              await this.saveAvatar(data.user.avatar);
              this.infoUserService.sendUserInfo({ name: this.storageService.getName(), avatar: this.storageService.getAvatar() });
              resolve(1);
            }
            else {
              this.token = null;
              this.userId = null;
              this.name = null;
              this.avatar = null;
              this.storageService.clearLocalStorage();
              resolve(0);
            }
          }, err => {
            console.log("err", err);
            resolve(-1);
          }
        );
      }
    );
  }

  public login(userId: string, password: string) {

    const data = {
      userId
      , password
    };

    return new Promise(
      resolve => 
        {
        this.httpClient.post<any>(`${ENDPOINT_LOGIN}`, data, httpOptions).subscribe(
          async (data) => {
            if (data.success) {
              await this.saveToken(data.token);
              await this.saveUserId(data.userId);
              await this.saveName(data.name);
              await this.saveAvatar(data.avatar);
              this.infoUserService.sendUserInfo({ name: this.storageService.getName(), avatar: this.storageService.getAvatar() });
              resolve(true);
            }
            else {
              this.token  = null;
              this.userId = null;
              this.name   = null;
              this.avatar = null;
              this.storageService.clearLocalStorage();
              resolve(false);
            }
          }
        );
      }
    );
  }

  public updateAgentDelivery(user: User) {

    const headers = new HttpHeaders()
      .set(KEY_TOKEN, this.storageService.getToken());
    const httpOptionsX =
    {
      headers
    };

    return new Promise((resolve) => {
      return this.httpClient.post(`${ENDPOINT_UPDATE}`, user, httpOptionsX).subscribe(
        (data) => {
          if (data['success']) {
            this.saveToken(data['token']);
            resolve(true);
          }
          else
            resolve(false);
        }
      );
    });
  }

  async verifyToken(): Promise<boolean> {

    await this.loadToken();

    if (!this.token) {
      this.navController.navigateRoot('/login');
      Promise.resolve(false);
    }

    const headers = new HttpHeaders()
      .set('x-token', this.storageService.getToken());

    const httpOptions = {
      headers
    };

    return new Promise<boolean>(
      resolve => {
        this.httpClient.get<any>(`${VERIFYTOKEN}`, httpOptions).subscribe(
          data => {
            if (data.success) {
              this.user = data.user;
              this.storageService.updateBasicLocalStorage(this.user.avatar, this.user.name);
              this.infoUserService.sendUserInfo({ name: data.user.name, avatar: data.user.avatar });
              resolve(true);
            }
            else {
              this.navController.navigateRoot('/login');
              resolve(false);
            }

          }
        );
      }
    );
  }

  public existUserByRole(role: string, userId: string): Promise<boolean>{
    const params = new HttpParams()
      .set('role', role )
      .set('userId', userId );
    const httpOptionsX =
    {
      params
    };

    return new Promise<boolean>(
      resolve =>{
        this.httpClient.get<any>(`${ENDPOINT_EXISTUSERBYROLE}`, httpOptionsX).subscribe(
          data =>
          {
            if(data.length == 0)
              resolve(false);
            else
              resolve(true);
          }
        );
      }
    );


  }

  logOut() {
    this.token = null;
    this.userId = null;
    this.name = null;
    this.avatar = null;
    this.storageService.clearLocalStorage();
    this.navController.navigateRoot('/login', { animated: true });
  }

  async saveToken(token: string) {
    this.token = token;
    this.storageService.setToken(token);
    await this.verifyToken();
  }

  async saveUserId(userId: string) {
    this.userId = userId;
    this.storageService.setUserId(userId);
  }

  async saveName(name: string) {
    this.name = name;
    this.storageService.setName(name);
  }

  async saveAvatar(avatar: string) {
    this.avatar = avatar;
    this.storageService.setAvatar(avatar);
  }

  async loadToken() {
    this.token = await this.storageService.getToken() || null;
  }

  public getTokenInfo(): Observable<any> {
    const headers = new HttpHeaders()
      .set('x-token', this.storageService.getToken());

    const httpOptions = {
      headers
    };
    return this.httpClient.get<any>(`${VERIFYTOKEN}`, httpOptions);
  }

  getAgentDeliveryCurrent() {
    return { ... this.user }
  }

}
