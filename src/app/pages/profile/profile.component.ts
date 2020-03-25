import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService, UploadService } from '../../services/service.index';
import  Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User;
  imgUpload: File;
  imgTemp: string;

  constructor(
    public _userService: UserService,
    public _upload: UploadService
  ) {
    this.user = this._userService.user;
  }

  ngOnInit() {
  }

  /**
   * Metodo para guardar lso datos del usuario
   * @param user
   */
  save(u: User) {
    this.user.name = u.name;
    if ( !this.user.google ) {
      this.user.email = u.email;
    }
    this._userService.updateUser(this.user).subscribe( resp => {
      if (resp['ok']) {
        this._userService.saveStorage(null, null, resp['user']);
        Swal.fire("Usuario actualizado!", resp['user'].email , "success");
      } else {
        Swal.fire("Oops!", "Ha ocurrido un error al actualizar el usuario , Inténtalo más tarde", "warning");
      }
    });
  }

  chooseImg(file: File) {

    if ( !file ) {
      this.imgUpload = null;
      return;
    }

    if ( file.type.indexOf('image') < 0 ) {
      Swal.fire('Sólo imágenes', 'El archivo seleccionado no es una imagen', 'error');
      this.imgUpload = null;
      return;
    }

    this.imgUpload = file;

    // let reader = new FileReader();
    // let urlImgTemp = reader.readAsDataURL( file );

    // reader.onloadend = () => this.imgTemp = reader.result;

  }

  changeImg() {
    this._userService.changeImg ( this.imgUpload, this.user._id );
  }

}

