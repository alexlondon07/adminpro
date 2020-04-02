import { Injectable } from '@angular/core';

@Injectable()
export class SidebarService {

  menu: any = [
    {
      title: 'Principal',
      icon: 'mdi mdi-gauge',
      submenu: [
        {
          title: 'Dashboard', url: '/dashboard'
        },
        {
          title: 'ProgressBar', url: '/progress'
        },
        {
          title: 'Gráficas', url: '/graficas1'
        },
        {
          title: 'Promises', url: '/promises'
        },
        {
          title: 'Ajustes del tema', url: '/account-settings'
        },
        {
          title: 'Rxjs', url: '/rxjs'
        },
      ]
    }, {
      title: 'Mantenimientos',
      icon: 'mdi mdi-folder-lock-open',
      submenu: [
        {
          title: 'Usuarios', url: '/users'
        },
        {
          title: 'Hospitales', url: '/hospitals'
        },
        {
          title: 'Médicos', url: '/doctors'
        }
      ]
    }
  ];

  constructor() { }

}
