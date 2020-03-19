import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../models/user.model';
import { UserService } from '../services/service.index';
import { NgForm } from '@angular/forms';
// ES6 Modules or TypeScript
import Swal from 'sweetalert2';

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  remember = true;
  auth2: any;

  constructor( public router: Router, public _userService: UserService) { }

  ngOnInit() {
    this.googleInit();
  }

  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: "303470695743-ns1e9d6ekrmmhpag18lc92jp95u47vfq.apps.googleusercontent.com",
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSignin( document.getElementById('btnGoogle') );
    });
  }

  attachSignin (element ) {
    this.auth2.attachClickHandler( element, {}, (googleUser) => {
      const profile = googleUser.getBasicProfile();
      console.log( profile );

      const token = googleUser.getAuthResponse().id_token;
      console.log(token);
      this.loginGoogle(token);
    });
  }

  /**
   * Metodo para realizar el login con Google
   */
  loginGoogle( token: string) {
    this._userService.loginGoogle( token ).subscribe(
      data => {
        if (data['ok']) {
          this.setLocalStorageLogin(data);
        } else {
          Swal.fire("Oops!", "Ha ocurrido un error en el login de google , Inténtalo más tarde", "warning");
        }
      },
      error => {
          Swal.fire("Oops!", error.error.message, "warning");
      }
    );
  }


  /**
   * Metodo para realizar el login de la aplicación
   */
  login(form: NgForm) {
    const user = new User(null, form.value.email, form.value.password);
    this._userService.login( user, form.value.remember ).subscribe(
      data => {
        if (data['ok']) {
          this.setLocalStorageLogin(data);
        } else {
          Swal.fire("Oops!", "Ha ocurrido un error en el login , Inténtalo más tarde", "warning");
        }
      },
      error => {
        console.log(error.error.message);
        const errorMjs = error.error.message !== undefined ? error.error.message : 'Error en el backend';
        Swal.fire("Oops!", errorMjs, "warning");
      }
    );
  }

  setLocalStorageLogin(data: any) {
    localStorage.setItem('id', data['user']._id);
    localStorage.setItem('token', data['token']);
    window.location.href = '#/dashboard';
//    this.router.navigate(['/dashboard']);
  }
}
