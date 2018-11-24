import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../services/producto.service';
import { Product } from '../interfaces/product';
import { DashboardService } from '../dashboard.service';
declare var $: any;
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  listProducts : Product[];
  listProductsLenght : number;
  listViews : number;
  listNotificaciones : any[];
  boolView : boolean = false;
  boolProduct : boolean = false;
  keyClient : string;
  Nombre : string;
  MercadoPago : boolean;

  constructor(
    private productoService : ProductoService,
  ){
    this.MercadoPago = false;
  }
  key;
  ngOnInit() {
    this.Nombre  = "";
    let jsonClient = [];
    this.listNotificaciones = [];
    let email = localStorage.getItem("cliente-chango");
    
    this.productoService.notificacionList()
    .snapshotChanges()
    .subscribe(data => {
      this.listNotificaciones = [];
      data.forEach(element => {
        let x = element.payload.toJSON();
        x["$key"] = element.key;
        this.listNotificaciones.push(x);
      });
    });


    //  Listado de clientes
    this.productoService.getListClientsWithSnap()
    .snapshotChanges()
    .subscribe(info => {
      info.forEach(element => {
        let y = element.payload.toJSON();
        y["$key"] = element.key;
        jsonClient.push(y);
      });
    //  Filtramos el cliente. UX  
    this.productoService.SearchRegistForEmail(email, jsonClient)
      .subscribe(data => {
        this.MercadoPago = (data.mercadopago !== undefined);
        console.log(this.MercadoPago);
        this.Nombre = data.marca;
        this.key = data.$key;
        this.listViews = data.web.view;
        if(this.listViews < 1000){
          this.boolView = true;
        }else{
          false;
        }
        this.keyClient = data.$key;
        this.productoService.returnListProducts(data.$key)
        .snapshotChanges()
        .subscribe(data => {
          this.listProducts = [];
          data.forEach(element => {
            let x = element.payload.toJSON();
            x["$key"] = element.key;
            this.listProducts.push(x as Product);
          });
          this.listProductsLenght = this.listProducts.length;
          if(this.listProductsLenght < 10){
            this.boolProduct = true;
          }else{
            this.boolProduct = false;
          }
        });
      });
    });
    
  }

}
