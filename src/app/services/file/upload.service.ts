import { Injectable } from '@angular/core';
import { URL_SERVICES } from '../../config';
// ES6 Modules or TypeScript
import  Swal from 'sweetalert2';
@Injectable()
export class UploadService {

  constructor() { }


  uploadFile(file: File, type: string, id: string) {

    return new Promise((resolve, reject) => {

      const formData = new FormData();
      const xhr = new XMLHttpRequest();

      formData.append('imagen', file, file.name);

      xhr.onreadystatechange = function () {

        if (xhr.readyState === 4) {

          if (xhr.status === 200) {
            console.log('Imagen subida');
            resolve(JSON.parse(xhr.response));
          } else {
            let error = JSON.parse(xhr.response);
            console.log('Fallo la subida');
            // Swal.fire("Oops!", error.errors.message, "warning");
            reject(xhr.response);
          }

        }
      };

      const url = URL_SERVICES + '/upload/' + type + '/' + id;
      xhr.open('PUT', url, true);
      xhr.send(formData);

    });
  }
}

