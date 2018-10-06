import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../services/pedido.service';
import { DashboardService } from '../dashboard.service';
import { ProductoService } from '../services/producto.service';
import { AnunciosService } from '../anuncios.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Carrito } from '../interfaces/carrito';
import { Http } from '@angular/http';
declare function require(name:string);

// declare var MP : any;
// import MP from 'mercadopago'
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})

export class CheckoutComponent implements OnInit {

  viewCart : boolean = false;

  precioTotal : number;
  Carrito : Carrito[];


  constructor(private http : Http, private PedidoService : PedidoService, private dashboard : DashboardService, private ProductService: ProductoService, private AnuncioService : AnunciosService, private router: Router, private _activatedRoute: ActivatedRoute) {}
  mp : any;
  preference : any;
  ngOnInit() {
    var MP = require ("mercadopago");
    MP.configure({  
      access_token: 'TEST-2407374069045658-112114-d0a018fae58454e2267bb9a5d813f2d8__LB_LC__-220000424'
    });
    // Create a preference structure
    var preference = {
      "items" : [
        {
          title: 'Lightweight Rubber Car',
          quantity: 4,
          currency_id: 'ARS',
          unit_price: 26.39
        }
      ]
    };
   
    MP.preferences.create(preference)
      .then(function (preference) {
        // Do something if preference has been created successfully
        console.log("SE ENVIO");
      }).catch(function (error) {
        console.log(error);
        // If an error has occurred
      });
  
    const key = this._activatedRoute.snapshot.paramMap.get('key');
    const producto = this._activatedRoute.snapshot.paramMap.get('producto');     
    let numeroPedido = localStorage.getItem('numero-pedido');
    const carrito = this.PedidoService.returnListCarrito(key);
    
    if(numeroPedido === undefined || numeroPedido === null){
      this.PedidoService.insertNewCarrito(key);
    }

    carrito.snapshotChanges()
    .subscribe(data => {
      this.Carrito = [];
      data.forEach(element => {
        let y = element.payload.toJSON();
        y["$key"] = element.key;
        if(parseInt(y["numeroPedido"]) === parseInt(numeroPedido)){
          this.Carrito.push(y);
        }
      });
      this.precioTotal = 0;
      this.Carrito.forEach(element => {
        this.precioTotal = this.precioTotal + element.cantidad * element.precioUnitario;
      });
    });
  }

  deleteItem(key){
    this.PedidoService.removePedido(key);
  }
  changeBoolean(event){
    this.viewCart = false;
  }

/* 
mercadopago.configure({
  client_id: '2407374069045658',
  client_secret: '7pAGZkoZYEnM2EiLPyKCkRwx0mhdgrjV'
});
------------------------------------------------------------
// Create a preference structure
    var preference = {
    items: [
      item = {
        id: '1234',
        title: 'Lightweight Rubber Car',
        quantity: 4,
        currency_id: 'ARS',
        unit_price: 26.39
      }
    ],
    payer = {
      email: 'callie.roob@hotmail.com'
    }
  };
 
  mercadopago.preferences.create(preference)
    .then(function (preference) {
      // Do something if preference has been created successfully
    }).catch(function (error) {
      // If an error has occurred
    }
---------------------------------------------
// ...
var payer = {
  name: "Charles",
  surname: "Montez",
  email: "charles@yahoo.com",
  date_created: "2015-06-02T12:58:41.425-04:00",
  phone: {
    area_code: "",
    number: "920-333-556"
  },
  identification: {
    type: "DNI",
    number: "12345678"
  },
  address: {
    street_name: "Carretera José Luis Suárez",
    street_number: "1878",
    zip_code: "20325"
  }
}
--------------------------------------------------
// ...
var shipments = {
    receiver_address: {
        zip_code: 20325",
        street_number: 1878,
        street_name: "Carretera José Luis Suárez",
        floor: 20,
        apartment: "C"
    }
};
// ...
-------------------------------------------------

*/
  



}






