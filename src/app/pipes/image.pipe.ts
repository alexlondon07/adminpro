import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICES } from '../config';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(img: any, type: string = 'user'): any {

    let url = URL_SERVICES + '/img';
    if ( !img ) {
      return url + '/user/xxx';
    }

    if ( img.indexOf('https') >= 0) {
      return img;
    }

    switch (type) {
      case 'user':
        url += '/user/' + img;
        break;

      case 'doctor':
        url += '/doctor/' + img;
        break;

      case 'hospital':
        url += '/hospital/' + img;
        break;

      default:
        console.log('Tipo de imagen no existe, user, doctor, hospital');
        url += '/user/xxx';
    }
    return url;

  }

}
