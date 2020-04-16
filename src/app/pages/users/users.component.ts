import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/service.index';
import { User } from '../../models/user.model';
// ES6 Modules or TypeScript
import  Swal from 'sweetalert2';

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
   * Método para eliminar un usuario
   * @param id Identificador del usuario
   */
  deleteUser(user: User) {
    if (user._id === this._userService.user._id) {
      Swal.fire("Importante!", "Error, No se puede borrar a si mismo", "error");
      return;
    }

    Swal.fire({
      title: 'Estas seguro?',
      text: "La información a eliminar es irreversible recuperar!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Estoy seguro!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.loading = true;
        this._userService.deleteUser( user._id ).subscribe( (resp: any) => {
          if ( resp['ok']) {
            this.loading = false;
            Swal.fire(
              'Eliminado!',
              'El registro ha sido eliminado',
              'success'
            );
          }
        });
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

  /**
   * Metodo para guardar usuario
   * @param user 
   */
  saveUser(user: User){
    this._userService.updateUser(user).subscribe( (resp: any) => {
      this._userService.validateResponseService( resp, "Usuario actualizado!" );
    });
    
  }
}
