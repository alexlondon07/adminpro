import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {map, filter } from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  suscription: Subscription;

  constructor() {
    this.suscription = this.returnObserver().subscribe(
      number => console.log(number),
      error => console.log('Error-->', error),
      () => console.log('Observer had been finished')
    );
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    console.log('Closed page');
    this.suscription.unsubscribe();
  }

  returnObserver(): Observable<number> {
    return new Observable( observer => {
      let count = 0;
        let interval = setInterval( () => {
          count += 1;

          const output = {
            value: count
          };

          observer.next(  output );

        /* if (count === 3) {
            clearInterval(interval);
            observer.complete();
          }

          if (count === 2) {
            clearInterval(interval);
            observer.error('Hello I am an error');
          } */

        }, 1000);
    }).pipe(
      map(resp => resp['value']),
      filter ( (value, index) => {
        if ( (value % 2) === 1 ) {
          // Impar
          return true;
        } else {
          // Par
          return false;
        }
    })
  );
}

}
