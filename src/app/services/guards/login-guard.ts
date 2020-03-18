import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../user/user.service';

@Injectable()
export class LoginGuard implements CanActivate {

  constructor( public _userService: UserService, public router: Router){

  }

  canActivate() {
    console.log(this._userService.isLogged());
    if ( this._userService.isLogged()) {
      return true;
    }else {
      this.router.navigate(['/login']);
      return false;
    }
  }

}
