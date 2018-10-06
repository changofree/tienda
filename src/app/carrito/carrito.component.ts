import { Component, EventEmitter,OnInit, Output } from '@angular/core';
import { Product } from '../interfaces/product';
import { Category } from '../interfaces/category';
import { Anuncio } from '../anuncio';
import { DashboardService } from '../dashboard.service';
import { ProductoService } from '../services/producto.service';
import { AnunciosService } from '../anuncios.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Cliente } from '../interfaces/cliente';
import { PedidoService } from '../services/pedido.service';
import { Carrito } from '../interfaces/carrito';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent implements OnInit {

  Carrito : Carrito[];
  carritoView : Carrito;
  precioTotal : number;
  constructor(private PedidoService : PedidoService, private dashboard : DashboardService, private ProductService: ProductoService, private AnuncioService : AnunciosService, private router: Router, private _activatedRoute: ActivatedRoute) { }


  @Output() viewCartd = new EventEmitter<boolean>();

  ngOnInit() {
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
        

        // this.precioTotal = this.precioTotal + (element.cantidad *  element.precioUnitario);
      });
    });

  }

  deleteItem(key){
    this.PedidoService.removePedido(key);
  }
  clickTo(){
    this.viewCartd.emit(true);
  }

}
