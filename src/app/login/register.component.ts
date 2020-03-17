import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import swal from 'sweetalert';
import { UserService } from '../services/service.index';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;

  constructor( private _userService: UserService, public router: Router) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      password2: new FormControl(null, Validators.required),
      conditions: new FormControl()
    }, { validators: this.passwordEquals( 'password', 'password2' )} );

    this.form.setValue({
      name: 'Alexander Londoño Espejo',
      email: 'alexlondon07@gmail.com',
      password: 'alex',
      password2: 'alex',
      conditions: true
    });
  }

  passwordEquals(field1: string, field2: string) {
    return ( group: FormGroup ) => {

      let pass1 = group.controls[field1].value;
      let pass2 = group.controls[field2].value;

      if (pass1 === pass2 ) {
        return null;
      }
      return {
        passwordEquals: true
      };

    };
  }

  /**
  * Método para registrar un usuario en la BD
  */
  registerUser() {
    if ( this.form.invalid ) {
      return;
    }
    if ( !this.form.value.conditions ) {
      swal('Oops!', 'Debe aceptar los términos', 'warning');
    } else {
      let user = new User(
        this.form.value.name,
        this.form.value.email,
        this.form.value.password
      );
      this._userService.createUser(user).subscribe(
          data => {
            if (data['ok']) {
              swal('Usuario creado correctamente.', data['user'].email, 'success');
              setTimeout(() => { this.router.navigate(['/login'])}, 1500);
            } else {
              swal('Oops!', 'Ha ocurrido un error , intentelo más tarde', 'warning');
            }
          },
          error => {
              swal('Oops!', error.error.message, 'warning');
          }
        );
    }
  }
}
