import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/service.index';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[] = [];
  totalRows = 0;
  since = 0;

  constructor(public _userService: UserService) { }

  ngOnInit() {
    this.loadUsers();
  }

  /**
   * Metodo para cargar los usuaarios de la bd
   */
  loadUsers() {
    this._userService.getUsers( this.since ).subscribe( (resp: any) => {
      if ( resp['ok']) {
        this.totalRows = resp.total;
        this.users = resp.users;
      }
      console.log( resp );
    });
  }

  /**
   * Metodo para cargar una lista de usuarios según la cantidad
   * @param value
   */
  changeSince(value: number) {
    const since = this.since + value;
    if ( since >= this.totalRows ) {
      return;
    }
    if ( since < 0 ) {
      return;
    }
    this.since  += value;
    this.loadUsers();
  }
}
