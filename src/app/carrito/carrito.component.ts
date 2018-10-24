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

  /**
   * 
   * Este componente genera la validacion y el agregado de cada producto.
   * Hace comunicacion con los componentes de Homeweb, Detalleweb, Checkout.
   * Output.
   * 
   **/

  @Output() viewCartd = new EventEmitter<boolean>();

  Carrito : Carrito[];
  carritoView : Carrito;
  precioTotal : number;
  key : string;

  constructor(private PedidoService : PedidoService, private dashboard : DashboardService, private ProductService: ProductoService, private AnuncioService : AnunciosService, private router: Router, private _activatedRoute: ActivatedRoute) { }


  ngOnInit() {
    const key = this._activatedRoute.snapshot.paramMap.get('key');
    const producto = this._activatedRoute.snapshot.paramMap.get('producto');     
    let numeroPedido = localStorage.getItem('numero-pedido');
    let KeyPedido = localStorage.getItem("key-pedido");
    const carrito = this.PedidoService.returnListCarrito(key); // Damos valor a la variable de RealTime database de FB para luego hacer el listado.
    this.key = key;
    
    carrito.snapshotChanges()
    .subscribe(data => {
      this.Carrito = [];
      
      data.forEach(element => {
        let y = element.payload.toJSON();
        y["$key"] = element.key;
        if(parseInt(y["numeroPedido"]) === parseInt(numeroPedido) ){    //Numero pedido tomado por localStorage para poder darle tiempo de vida al carrito de cada cliente.
          this.Carrito.push(y);
        }
      });

      this.precioTotal = 0; //  Acumulacion del precio total de cada elemento agregado al carrito.
      this.Carrito.forEach(element => {
        this.precioTotal = this.precioTotal + element.cantidad * element.precioUnitario;    
      });
    });
   
  }

  /**
   * Se toma la key del pedido por html.
   * @param key Valor tomado por evento (click)
   */
  deleteItem(key){
    this.PedidoService.removePedido(key);
  }

  //  Cerramos el carrito.
  clickTo(){
    this.viewCartd.emit(true);
  }

}
