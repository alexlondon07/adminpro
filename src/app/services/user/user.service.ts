import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import "rxjs/Rx";
import { User } from "../../models/user.model";
import { URL_SERVICES } from "../../config";
import { Router } from "@angular/router";
import { UploadService } from "../file/upload.service";
import  Swal from 'sweetalert2';

@Injectable()
export class UserService {
  user: any;
  token: string;

  constructor(public _http: HttpClient, public _router: Router, public _upload: UploadService) {
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
   * Método para actualizar un usuario
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
    if ( id != null ) {
      localStorage.setItem('id', id );
    }
    if ( token != null ) {
      localStorage.setItem('token', token );
      this.token = token;
    }
    if ( user != null ) {
      localStorage.setItem('user', JSON.stringify(user) );
      this.user = user;
    }
  }

  /**
   * Metodo para cambiar la imagen del perfil
   * @param file
   * @param id
   */
  changeImg(file: File, id: string ) {
    this._upload.uploadFile( file, 'user', id)
    .then ( (resp: any) => {
      this.user.img = resp.user.img;
      Swal.fire('Imagen actualizada', this.user.name, 'success');
    })
    .catch ( resp => {
      console.log( resp );
      Swal.fire("Oops!", "Ha ocurrido un error al actualizar la imagen del usuario , Inténtalo más tarde", "warning");
    });
  }

  /**
   * Metodo para obtener los usuarios registrados en la bd
   */
  getUsers( since: number = 0) {
    const url = `${URL_SERVICES}/users?from=${since}`;
    return this._http.get(url);
  }
}
