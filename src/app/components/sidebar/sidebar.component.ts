import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'app/services/producto.service';
import { Router } from '@angular/router';
import { PedidoService } from 'app/services/pedido.service';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [ 
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
  Diseno : boolean;
  Adm : boolean;
  Est : boolean;
  cantPedido : number;
  key;

  constructor(
    private productService : ProductoService,
    private router : Router,
    private pedidoService : PedidoService
  ) {
    this.cantPedido = 0;
    this.Adm = false;
    this.Est = false;
    this.Diseno = false;
   }
   changeDiseno(){
    this.Diseno = (this.Diseno === false) ? true : false;
   }
   changeAdm(){
    this.Adm = (this.Adm === false) ? true : false;
   }
   changeEst(){
       this.Est = (this.Est === false) ? true : false;
   }
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
        let pedido;
        data.forEach(element => {
            let x = element.payload.toJSON();
            x["$key"] = element.key;
            if(x["email"] === this.clienteOnline){
                let fechaTotal = x["hasta"].split("/");  // 0 = dia , 1 = mes , 2 = año
                this.Marca = x["$key"];
                let f = new Date();
                pedido = x["pedido"];
                let diaActual = Number(f.getDate());
                let mesActual = Number(f.getMonth()); 
                let anoActual = Number(f.getFullYear());
                if(Number(fechaTotal[1]) <= mesActual && fechaTotal[2] <= anoActual && fechaTotal[0] <= diaActual){
                  this.router.navigateByUrl("/validacion")        
                }
            }
        });
        this.pedidoService.getPedidos(this.Marca)
        .snapshotChanges()
        .subscribe(data => {
        let aux = [];
            data.forEach(element => {
            let x = element.payload.toJSON();
            x["$key"] = element.key;
            if(x["status"] === 1)
            aux.push(x);
            });
            this.cantPedido = aux.length;
        });
        this.cantPedido = 0;
        pedido.forEach(element => {
            this.cantPedido++;
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
