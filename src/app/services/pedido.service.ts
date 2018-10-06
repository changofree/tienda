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


@Injectable()
export class PedidoService {

  constructor( private fireBase: AngularFireDatabase ) { }

  listCarrito: AngularFireList<Carrito>;

  returnListCarrito(key){
    return this.listCarrito= this.fireBase.list('cliente/'+key+'/web/carrito');
  }  

  insertNewCarrito(key){
    let x = [];
    this.fireBase.list('cliente/'+key+'/web/carrito')
    .snapshotChanges()
    .subscribe(data => {
      data.forEach(element => {
        let y = element.payload.toJSON();
        y["$key"] = element.key;
        x.push(y);
      });
    });


    this.listCarrito.push({
      numeroPedido:x.length+1,
      nombreProducto:"",
      imagenProducto:"",
      cantidad: 0,
      precioUnitario: 0
    });
    localStorage.setItem('numero-pedido',(x.length+1).toString());
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
        if(parseInt(y["numeroPedido"]) === parseInt(numeroPedido)){
          x.push(y);
        }
      });
      if(bool){ 
      if(x[0].nombreProducto === ""){
        this.listCarrito.update(x[0].$key,{
          nombreProducto: product.name,
          numeroPedido: numeroPedido,
          imagenProducto: product.img[0],
          precioUnitario: parseInt(product.price),
          cantidad: cantidad
        })
      }else{
        this.listCarrito.push({
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
}