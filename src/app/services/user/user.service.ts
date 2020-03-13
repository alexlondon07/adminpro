import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/user.model';
import { URL_SERVICES } from '../../config';

@Injectable()
export class UserService {

constructor(public _http: HttpClient) { }

  createUser(user: User) {
    let url =`${URL_SERVICES}/user`;
    console.log(url);
    return this._http.post(url, user);
  }

}
