import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../services/pedido.service';
import { ProductoService } from '../services/producto.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Carrito } from '../interfaces/carrito';
import { Cliente } from 'app/interfaces/cliente';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})

export class CheckoutComponent implements OnInit {

  viewCart : boolean = false;
  BoolEmail : boolean;
  BoolTelefono : boolean;
  BoolDNI : boolean;
  BoolNombre : boolean;

  precioTotal : number;
  Carrito : Carrito[];
  linkMercadopago;
  buttonEdit : boolean = true;
  mp : any;
  preference : any;
  numberPedido;
  keyPedido : string;
  Marca : string;
  AcessToken;
  key : string; 

  Telefono : string = "";
  Email : string = "";
  Nombre : string;
  DNI : string; 

  constructor(
    private PedidoService : PedidoService,
    private ProductService: ProductoService,
    private router: Router,
    private _activatedRoute: ActivatedRoute
  ){
    this.Telefono = "";
    this.Email = "";
    this.Nombre = "";
    this.DNI = "";
    this.BoolDNI = false;
    this.BoolEmail = false;
    this.BoolNombre = false;
    this.BoolTelefono = false;
  }
  
  
  ngOnInit() {  
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0)
    });
  
    this.key = "";  
    this.buttonEdit = false;
    let auxBool = true;
    let listClient : Cliente[]
    listClient = [];
    const key = this._activatedRoute.snapshot.paramMap.get('key');
    this.key = key;
    this.Marca = key;
    const producto = this._activatedRoute.snapshot.paramMap.get('producto');     
    let clienteOnline = localStorage.getItem("cliente-chango");    
    this.numberPedido = localStorage.getItem('numero-pedido');
    this.keyPedido = localStorage.getItem('key-pedido');
    const carrito = this.PedidoService.returnListCarrito(key);
    

    this.ProductService.getListClientsWithSnap()
    .snapshotChanges()
    .subscribe(data => {
      
      data.forEach(element => {
        let x = element.payload.toJSON();
        x["$key"] = element.key;
        if(x["$key"] ===  key){
          listClient.push(x as Cliente);
        }
      });
    
      //Usamos el auxBool para que si llega a ver algun cambio en el listado de clientes, no se vuelva a actualizar esta información.
      if(auxBool){
        carrito.snapshotChanges()
        .subscribe(data => {
          this.Carrito = [];
          data.forEach(element => {
            let y = element.payload.toJSON();
            y["$key"] = element.key;
            if(parseInt(y["numeroPedido"]) === parseInt(this.numberPedido)){  //  Guardamos todos los pedidos con el numero de pedido guardado en localStorage.
              this.Carrito.push(y);
            }
          });
          
          if(this.numberPedido === undefined || this.numberPedido === null || this.keyPedido === undefined || this.keyPedido === undefined || this.Carrito.length === 0){
            this.router.navigateByUrl("/"+key);  //  Si queremos entrar al checkout sin ningun producto agregado o algun numeroPedido generado, volvemos a la home.
          }

          this.AcessToken = listClient[0].mercadopago.access_token; //  Datos de mercadoPago para generar la venta.
          this.precioTotal = 0; // Precio total de todos los productos en el carrito.
          this.Carrito.forEach(element => {
            this.precioTotal = this.precioTotal + element.cantidad * element.precioUnitario;
          });
        });
        auxBool = false;  //  Cerramos el ciclo.
      }
    });
  
  }

  /**
   * Funcion que se ejecuta al hacer click Realizar Compra
   */
  goMercado(){  
    if(this.Nombre === ""){
      this.BoolNombre = true;
    }else{
      this.BoolNombre = false;
    }
    
    if(this.Email === ""){
      this.BoolEmail = true;
    }else{
      this.BoolEmail = false;
    }
    
    if(this.DNI === ""){
      this.BoolDNI = true;
    }else{
      this.BoolDNI = false;
    }

    if(this.Telefono === ""){
      this.BoolTelefono = true;
    }else{
      this.BoolTelefono = false;
    }

    if(this.BoolDNI === false && this.BoolEmail === false && this.BoolNombre === false && this.BoolTelefono === false){
    const key = this._activatedRoute.snapshot.paramMap.get('key');
    //  Juntamos toda la informacion necesaria para enviar a mercadopago y nos devuelve la url de pago.
    this.PedidoService.preferenceMP(this.Marca,this.precioTotal,key,this.numberPedido,this.Telefono, this.Email, this.AcessToken, this.Nombre, this.DNI)
      .subscribe(data => {
      this.linkMercadopago = data.text();
      localStorage.removeItem("numero-pedido");
      localStorage.removeItem("key-pedido");

      location.href = this.linkMercadopago;

    });
    }
  }

  //  Borramos algun item del carrito.
  deleteItem(key){
    this.PedidoService.removePedido(key);
  }




  /**
   * Agregamos uno mas a la cantidad o sacamos uno con las funciones updateMenos updateMas
   */

  updateMenos(item : Carrito){
    if(item.cantidad > 1){
      this.PedidoService.menosCantidad(item);
    } 
  }
  updateMas(item : Carrito){
    this.PedidoService.masCantidad(item);
  }

}






