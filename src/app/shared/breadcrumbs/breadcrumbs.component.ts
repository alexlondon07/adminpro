import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ActivationEnd } from '@angular/router';
import { filter , map} from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {

  title: string;

  constructor( private router: Router ) {
    this.getDataRoute()
    .subscribe ( data => {
      console.log( data );
      this.title = data.title;
    });
  }

  ngOnInit() {
  }

  /**
   * Obtener la data de la ruta
   */
  getDataRoute() {
    return this.router.events
    .pipe(
      filter( event => event instanceof ActivationEnd ),
      filter( (event: ActivationEnd) => event.snapshot.firstChild === null ),
      map(  ( event: ActivationEnd ) => event.snapshot.data)
    );
  }

}
