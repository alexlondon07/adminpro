import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import "rxjs/Rx";
import { User } from "../../models/user.model";
import { URL_SERVICES } from "../../config";
import { Observable } from "rxjs/Rx";

@Injectable()
export class UserService {
  user: any;
  token: string;

  constructor(public _http: HttpClient) {
    this.loadStorage();
  }

  createUser(user: User) {
    let url = `${URL_SERVICES}/users`;
    return this._http.post(url, user);
  }

  login(user: User, remember: boolean = false) {
    if (remember) {
      localStorage.setItem("email", user.email);
    } else {
      localStorage.removeItem("email");
    }
    let url = `${URL_SERVICES}/login`;
    return this._http.post(url, user);
  }

  loginGoogle(token: string) {
    let url = `${URL_SERVICES}/login/google`;
    return this._http.post(url, { token });
  }

  /**
   * Metodo para valiar si el usuario está logueado
   */
  isLogged() {
    const token =  localStorage.getItem('token');
    return token != null && token.length > 5 ? true : false;
  }

  loadStorage() {
    if (localStorage.getItem("token")) {
      this.token = localStorage.getItem("token");
      this.user = localStorage.getItem("user");
    } else {
      this.token = "";
      this.user = null;
    }
  }
}
