import { Component, OnInit } from '@angular/core';
import { Form, FormGroup, FormControl, Validators } from '@angular/forms';
import { group } from '@angular/core/src/animation/dsl';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;

  constructor() { }

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
      name: 'Alexander Londoño',
      email: 'alexlondon07@gmail.com',
      password: 'alex',
      password2: 'alex',
      conditions: true
    })
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

  registerUser() {
    if ( this.form.invalid ) {
      return;
    }
    if ( this.form.value.conditions ) {
      console.log('Debe aceptar los términos.');
    }
    console.log(this.form);

    console.log(this.form.value);
  }

}
