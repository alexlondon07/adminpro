import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { SettingsService } from '../../services/service.index';

@Component({
  selector: 'app-accout-settings',
  templateUrl: './accout-settings.component.html',
  styles: []
})
export class AccoutSettingsComponent implements OnInit {

  constructor( @Inject (DOCUMENT) private _document, public settingsService: SettingsService) { }

  ngOnInit() {
  }

  changeColor(theme: string, link: string) {

    this.applyCheck(link);

    this.settingsService.applyTheme(theme);
  }

  applyCheck(link: any) {
    const selectors = this._document.getElementsByClassName('selector');
    for (const ref of selectors){
      ref.classList.remove('working');
    }
    link.classList.add('working');
  }

}
