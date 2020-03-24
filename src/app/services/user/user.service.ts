import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import "rxjs/Rx";
import { User } from "../../models/user.model";
import { URL_SERVICES } from "../../config";
import { Observable } from "rxjs/Rx";
import { Router } from "@angular/router";

@Injectable()
export class UserService {
  user: any;
  token: string;

  constructor(public _http: HttpClient, public _router: Router) {
    this.loadStorage();
  }

  /**
   * Metodo para crear nuevos usuarios
   * @param user
   */
  createUser(user: User) {
    const url = `${URL_SERVICES}/users`;
    return this._http.post(url, user);
  }

  /**
   * Método apra actualizar un usuario
   */
  updateUser(user: User) {
    const url = `${URL_SERVICES}/users/${user._id}?token=${this.token}`;
    return this._http.put(url, user);
  }

  /**
   * Metodo para realizar el login normal
   * @param user
   * @param remember
   */
  login(user: User, remember: boolean = false) {
    if (remember) {
      localStorage.setItem("email", user.email);
    } else {
      localStorage.removeItem("email");
    }
    let url = `${URL_SERVICES}/login`;
    return this._http.post(url, user);
  }

  /**
   * Metodo para realiza el login con Google
   */
  loginGoogle(token: string) {
    const url = `${URL_SERVICES}/login/google`;
    return this._http.post(url, { token });
  }

  /**
   * Metodo para valiar si el usuario está logueado
   */
  isLogged() {
    const token =  localStorage.getItem('token');
    return token != null && token.length > 5 ? true : false;
  }

  /**
   * Metodo para cargar los datos del localstorage
   */
  loadStorage() {
    if (localStorage.getItem("token")) {
      this.token = localStorage.getItem("token");
      this.user = JSON.parse(localStorage.getItem("user"));
    } else {
      this.token = "";
      this.user = null;
    }
  }

  /**
   * Metodo para realizar el logout
   */
  logout() {
    this.token = '';
    this.user = null;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this._router.navigate(['login']);
  }

  /**
   * Metodo para guardar en localstorage
   * @param id
   * @param token
   * @param user
   */
  saveStorage( id: string, token: string, user: User ) {
    localStorage.setItem('id', id );
    localStorage.setItem('token', token );
    localStorage.setItem('user', JSON.stringify(user) );

    this.user = user;
    this.token = token;
  }
}
