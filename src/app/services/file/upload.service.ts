import { Injectable } from '@angular/core';
import { URL_SERVICES } from '../../config';

@Injectable()
export class UploadService {

  constructor() { }


  uploadFile(file: File, type: string, id: string) {

    return new Promise((resolve, reject) => {

      let formData = new FormData();
      let xhr = new XMLHttpRequest();

      formData.append('imagen', file, file.name);

      xhr.onreadystatechange = function () {

        if (xhr.readyState === 4) {

          if (xhr.status === 200) {
            console.log('Imagen subida');
            resolve(JSON.parse(xhr.response));
          } else {
            console.log('Fallo la subida');
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

