import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert';
import { User } from '../models/user.model';
import { UserService } from '../services/service.index';
import { NgForm } from '@angular/forms';
// declare function init_plugins();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  remember = true;

  constructor( public router: Router, public _userService: UserService) { }

  ngOnInit() {
    // init_plugins();
  }

  /**
   * Metodo para realizar el login de la aplicación
   */
  login(form: NgForm) {
    const user = new User(null, form.value.email, form.value.password);
    this._userService.login( user, form.value.remember ).subscribe(
      data => {
        if (data['ok']) {
          localStorage.setItem('id', data['user']);
          localStorage.setItem('token', data['token']);
          this.router.navigate(['/dashboard']);
        } else {
          swal('Oops!', 'Ha ocurrido un error en el login , intentelo más tarde', 'warning');
        }
      },
      error => {
          swal('Oops!', error.error.message, 'warning');
      }
    )
  }
}
