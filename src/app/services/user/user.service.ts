import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/Rx';
import { User } from '../../models/user.model';
import { URL_SERVICES } from '../../config';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class UserService {

constructor(public _http: HttpClient) { }

    createUser(user: User) {
      let url =`${URL_SERVICES}/users`;
      return this._http.post(url, user);
    }

    login (user: User, remember: boolean = false ) {
      if (remember ) {
        localStorage.setItem('email', user.email);
      }else {
        localStorage.removeItem('email');
      }
      let url =`${URL_SERVICES}/login`;
      console.log('Login', url);
      return this._http.post(url, user);
    }
}
