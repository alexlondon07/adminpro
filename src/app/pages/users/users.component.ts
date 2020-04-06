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
  loading = true;


  constructor(public _userService: UserService) { }

  ngOnInit() {
    this.loadUsers();
  }

  /**
   * Metodo para cargar los usuarios de la bd
   */
  loadUsers() {
    this.loading = true;
    this._userService.getUsers( this.since ).subscribe( (resp: any) => {
      if ( resp['ok']) {
        this.totalRows = resp.total;
        this.users = resp.users;
        this.loading = false;
      }
    });
  }

  /**
   * Método para buscar un usuario
   * @param text Texto de búsqueda para el usuario
   */
  searchUsers(text: string) {

    if ( text.length <= 0 ) {
      this.loadUsers();
      return;
    }

    this.loading = true;

    this._userService.searchUsers( text ).subscribe( (resp: any) => {
      if ( resp['ok']) {
        this.totalRows = resp.total;
        this.users = resp.users;
        this.loading = false;
      }
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
