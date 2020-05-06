import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2";
import { UploadService } from '../../services/file/upload.service';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: "app-modal-upload",
  templateUrl: "./modal-upload.component.html",
  styleUrls: ["./modal-upload.component.css"],
})
export class ModalUploadComponent implements OnInit {
  hide: string = "";
  imgUpload: File;
  imgTemp: any;

  constructor(public _uploadService: UploadService, public _modalUploadService: ModalUploadService) {}

  ngOnInit() {}

  /**
   * Metodo para seleccionar una imagen
   */
  chooseImg(file: File) {
    if (!file) {
      this.imgUpload = null;
      return;
    }

    if (file.type.indexOf("image") < 0) {
      Swal.fire(
        "Sólo imágenes",
        "El archivo seleccionado no es una imagen",
        "error"
      );
      this.imgUpload = null;
      return;
    }

    this.imgUpload = file;

    const reader = new FileReader();
    const urlImgTemp = reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.imgTemp = reader.result;
      console.log(reader.result);
    };
  }

  /**
   * Método para subir la imagen
   */
  uploadFile(){
    this._uploadService.uploadFile( this.imgUpload, this._modalUploadService.type, this._modalUploadService.id )
    .then ( resp => {
      console.log(resp);
      this._modalUploadService.notification.emit ( resp );
      this.closeModal();
    })
    .catch((err) => {
      console.log( 'Error upload');
    })
  }

  /**
   * Método para cerrar el modal
   */
  closeModal(){
    this.imgTemp = null;
    this.imgUpload = null;
    this._modalUploadService.hideModal();
  }
}
