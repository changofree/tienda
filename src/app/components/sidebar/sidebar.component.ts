import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [ 
    { path: '/inicio', title: 'Inicio',  icon:'home', class: '' },
    { path: '/dashboard', title: 'Panel central',  icon: 'dashboard', class: '' },
    { path: '/listado-productos', title: 'Productos',  icon:'content_paste', class: '' },
    { path: '/listado-categorias', title: 'Categorias',  icon:'content_paste', class: '' },
    { path: '/user-profile', title: 'User Profile',  icon:'person', class: '' },
    { path: '/anuncios', title: 'Anuncios',  icon:'content_paste', class: '' },
];

@Component({
  selector: 'app-sidebar', 
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  
  menuItems: any[];
  clienteOnline : string;

  constructor() { }

  ngOnInit() {
    this.clienteOnline = localStorage.getItem("cliente-chango")
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
