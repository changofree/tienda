import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'app/services/producto.service';
import { Router } from '@angular/router';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [ 
    { path: '/backend/inicio', title: 'Inicio',  icon:'home', class: '' },
    { path: '/backend/panel', title: 'Panel central',  icon: 'dashboard', class: '' },
    { path: '/backend/listado-productos', title: 'Productos',  icon:'style', class: '' },
    { path: '/backend/listado-categorias', title: 'Categorias',  icon:'category', class: '' },
    { path: '/backend/anuncios', title: 'Foto Portada',  icon:'layers', class: '' },
    { path: '/backend/personalizar', title: 'Personalizar',  icon:'edit', class: '' },
    { path: '/backend/plantillas', title: 'Plantillas',  icon:'important_devices', class: '' },
    { path: '/backend/listado-pedidos', title: 'Pedidos',  icon:'import_contacts', class: '' },
    { path: '/backend/listado-ventas', title: 'Ventas',  icon:'equalizer', class: '' },
    { path: '/backend/configuracion', title: 'Datos de cuenta',  icon:'settings', class: '' },
    { path: '/backend/soporte', title: 'Soporte',  icon:'message', class: '' },

];

@Component({
  selector: 'app-sidebar', 
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  
  menuItems: any[];
  clienteOnline : string;
    Marca : string;

  constructor(
    private productService : ProductoService,
    private router : Router
  ) { }

  ngOnInit() {
    localStorage.removeItem('firebase:previous_websocket_failure');

    this.Marca = "";
    this.clienteOnline = localStorage.getItem("cliente-chango");
    if(this.clienteOnline === null || this.clienteOnline === undefined){
        location.href="http://changofree.com/home";
    }
    this.productService.getListClientsWithSnap()
    .snapshotChanges()
    .subscribe(data => {
        data.forEach(element => {
            let x = element.payload.toJSON();
            x["$key"] = element.key;
            if(x["email"] === this.clienteOnline){
                let fechaTotal = x["hasta"].split("/");  // 0 = dia , 1 = mes , 2 = año
                this.Marca = x["$key"];
                let f = new Date();        
            
                let diaActual = Number(f.getDate());
                let mesActual = Number(f.getMonth()); 
                let anoActual = Number(f.getFullYear());
                
                if(Number(fechaTotal[1]) <= mesActual && fechaTotal[2] <= anoActual && fechaTotal[0] <= diaActual){
                  this.router.navigateByUrl("/validacion")        
                }
            }
        });
    });
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }

  cerrarSesion(){
      localStorage.clear();
      location.href = "https://changofree.com/";
  }

  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
