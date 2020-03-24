import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/service.index';

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
    public _userService: UserService
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
    this._userService.updateUser(this.user).subscribe( resp => {
      console.log(resp);
    });
  }

  chooseImg(file: File) {

    // if ( !archivo ) {
    //   this.imgUpload = null;
    //   return;
    // }

    // if ( archivo.type.indexOf('image') < 0 ) {
    //   swal.fire('Sólo imágenes', 'El archivo seleccionado no es una imagen', 'error');
    //   this.imgUpload = null;
    //   return;
    // }

    // this.imgUpload = archivo;

    // let reader = new FileReader();
    // let urlImgTemp = reader.readAsDataURL( archivo );

    // reader.onloadend = () => this.imgTemp = reader.result;

  }

  changeImg() {
  }

}

