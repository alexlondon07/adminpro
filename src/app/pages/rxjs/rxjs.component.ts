import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { error } from 'protractor';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit {

  constructor() {
    let obs = new Observable( observer => {
      let count = 0;
        let interval = setInterval( () => {
          count += 1;
          observer.next(  count );

          if (count === 3) {
            clearInterval(interval);
            observer.complete();
          }

          if (count === 2) {
            observer.error('Hello I am an error');
          }

        }, 1000);
    });

    obs.subscribe(
      number => console.log(number),
      error => console.log('Error-->', error),
      () => console.log('Observer had been finished')
    );
  }

  ngOnInit() {
  }

}
