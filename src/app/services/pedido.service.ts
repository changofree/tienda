import { Injectable } from '@angular/core';
import { of } from 'rxjs/observable/of';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Product } from '../interfaces/product';
import { Cliente } from '../interfaces/cliente';
import { Observable } from 'rxjs-compat';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import { Imgupload } from '../imgupload';
import { Category } from '../interfaces/category';
import { Anuncio } from '../anuncio';
import { Carrito } from '../interfaces/carrito';
import { Http } from '@angular/http';


@Injectable()
export class PedidoService {

  constructor( private fireBase: AngularFireDatabase, private http : Http ) { }

  listCarrito: AngularFireList<Carrito>;
  listPedidos: AngularFireList<any>;

  returnListCarrito(key){
    return this.listCarrito= this.fireBase.list('cliente/'+key+'/web/carrito');
  }  

  getPedidos(key){
    return this.listPedidos = this.fireBase.list('cliente/'+key+'/pedido');
  }



  insertNewCarrito(key){
    
    let aux : number;
    let x = [];
    let bool = true;
    this.fireBase.list('cliente/'+key+'/web/carrito')
    .snapshotChanges()
    .subscribe(data => {
      data.forEach(element => {
        let y = element.payload.toJSON();
        y["$key"] = element.key;
        x.push(y);
      });
      if(bool){
        if(x === undefined || x === null || x === []){
          aux = 1;
        }else{
          aux = (x.length + 1);
        }
        bool = false;        
        localStorage.setItem('numero-pedido',aux.toString() );
        localStorage.setItem('key-pedido', key);
      }
    }); 
    
 
  }

   
  removePedido(key){
    this.listCarrito.remove(key);
  }

  insertCarrito(key, numeroPedido, product : Product, cantidad){
    let bool = true;
    let x : Carrito[];
    x = [];
    this.fireBase.list('cliente/'+key+'/web/carrito')
    .snapshotChanges()
    .subscribe(data => {
      data.forEach(element => {
        let y = element.payload.toJSON();
        y["$key"] = element.key;
        if(parseInt(y["numero-pedido"]) === parseInt(numeroPedido)){
          x.push(y);
        }
      });
      if(bool){ 
        console.log(x);
        if(x.length === 0){
          this.listCarrito.push({
            keyfb:key,
            nombreProducto: product.name,
            numeroPedido: numeroPedido,
            imagenProducto: product.img[0],
            precioUnitario: parseInt(product.price),
            cantidad: cantidad
          });
        }else{
        this.listCarrito.push({
          keyfb:key,
          nombreProducto: product.name,
          numeroPedido: numeroPedido,
          imagenProducto: product.img[0],
          precioUnitario: parseInt(product.price),
          cantidad: cantidad
        });
      }
    bool = false;  
    }
    });
  
  }

  preferenceMP(marca, precioTotal, keyFB, pedido, telefono, email, at){
    if(telefono === undefined || telefono === null){
      telefono = "No disponible";
    }
    if(email === undefined || email === null){
      email = "No disponible";
    }
    return this.http.get("assets/php/mp.php?marca="+marca+"&precio="+precioTotal+"&key="+keyFB+"&pedido="+pedido+"&tel="+telefono+"&email="+email+"&access_token="+at);
  }

  masCantidad(item : Carrito){
    item.cantidad++;
    this.listCarrito.update(item.$key, {
      nombreProducto : item.nombreProducto,
      numeroPedido: item.numeroPedido,
      imagenProducto: item.imagenProducto,
      precioUnitario: item.precioUnitario,
      cantidad: item.cantidad
    }); 
  }

  menosCantidad(item : Carrito){
    item.cantidad--;
    this.listCarrito.update(item.$key, {
      nombreProducto : item.nombreProducto,
      numeroPedido: item.numeroPedido,
      imagenProducto: item.imagenProducto,
      precioUnitario: item.precioUnitario,
      cantidad: item.cantidad
    }); 
  }

  updatePago(status){
    this.fireBase.list('cliente')
    .push({
      status: status
    });
  }
  updatePedido(x){
    this.listPedidos.update(x.$key,{
      DNI:x.DNI,
      email: x.email,
      estado: x.estado,
      fechacreacion:x.fechacreacion,
      idpedido: x.idpedido,
      nombres:x.nombres,
      pedido:x.pedido,
      status:2,
      telefono:x.telefono,
      total: x.total
    });
  }

  SearchRegistForPedido(pedido, json)  {
    return of(json.find((carrito => carrito.numeroPedido === pedido)));
  }

}