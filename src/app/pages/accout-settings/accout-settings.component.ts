import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
  selector: 'app-accout-settings',
  templateUrl: './accout-settings.component.html',
  styles: []
})
export class AccoutSettingsComponent implements OnInit {

  constructor( @Inject (DOCUMENT) private _document) { }

  ngOnInit() {
  }

  changeColor(theme: string, link: string) {
    this.applyCheck(link);
    const url = `assets/css/colors/${theme}.css`;
    this._document.getElementById('theme').setAttribute('href', url);
  }

  applyCheck(link: any) {
    const selectors = this._document.getElementsByClassName('selector');
    for (const ref of selectors){
      ref.classList.remove('working');
    }
    link.classList.add('working');
  }

}
