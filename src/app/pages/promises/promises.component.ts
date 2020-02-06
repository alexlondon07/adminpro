import { Component, OnInit } from '@angular/core';
import { resolve } from 'url';

@Component({
  selector: 'app-promises',
  templateUrl: './promises.component.html',
  styles: []
})
export class PromisesComponent implements OnInit {

  constructor() {
    this.count3().then(
      response => console.log('Finish-->' + response)
    )
      .catch(error => console.error('Error in promise', error));
  }

  ngOnInit() {
  }

  count3(): Promise<boolean> {
      return new Promise((resolve, reject) => {
      let count = 0;
      let interval = setInterval(() => {
        count += 1;
        if (count === 3) {
          resolve(true);
          // reject('Simple Error');
          clearInterval(interval);
        }
      }, 1000);
    });
  }

}
