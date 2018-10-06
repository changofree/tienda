import { Component, OnInit } from '@angular/core';
import { Product } from '../../interfaces/product';
import { Category } from '../../interfaces/category';
import { Anuncio } from '../../anuncio';
import { DashboardService } from '../../dashboard.service';
import { ProductoService } from '../../services/producto.service';
import { AnunciosService } from '../../anuncios.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Cliente } from '../../interfaces/cliente';
import { PedidoService } from '../../services/pedido.service';
import { Carrito } from '../../interfaces/carrito';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss']
})
export class DetalleComponent implements OnInit {


  listAnuncios : Anuncio[];
  listProducts : Product[];
  listCategory : Category[];
  product : Product;

  arrayImg : string[];
  Marca : string;
  view : boolean = true;

  Desde : number = 0;
  Hasta : number = 8;

  viewCart : boolean = false;
  Carrito : Carrito[];
  constructor(private PedidoService : PedidoService, private dashboard : DashboardService, private ProductService: ProductoService, private AnuncioService : AnunciosService, private router: Router, private _activatedRoute: ActivatedRoute) { }

  positionInitial = 0;
  cantProd = 1;

  changeBoolean(event){
    this.viewCart = false;
  }

  ngOnInit() {
    this.cantProd = 1;
    this.view = true;
    let aux : Cliente[];
    aux = [];
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
        if(y["numeroPedido"] === parseInt(numeroPedido)){
          this.Carrito.push(y);
        }
      });
    });
    
    
    
    this.dashboard.returnListClients()
    .snapshotChanges()
    .subscribe(data => {
      data.forEach(element => {
        let x = element.payload.toJSON();
        x["$key"] = element.key;
        if(x["$key"] === key)
        aux.push(x);
      });
      if(aux[0].web.view !== undefined){
        aux[0].web.view = aux[0].web.view + 1;
      }else{
        aux[0].web.view = 1;
      }
      this.Marca = aux[0].web.name;
      console.log(this.view);
      if(this.view){
        this.view = this.dashboard.updateVisitas(key, aux[0]);
      }
    });
    
    this.listAnuncios = [];
    this.AnuncioService.returnListAnuncios(key)
    .snapshotChanges()
    .subscribe(data => {
      data.forEach(element => {
        let x = element.payload.toJSON();
        x["$key"] = element.key;
        this.listAnuncios.push(x as Anuncio);
      });
      this.arrayImg = [];
          Object.keys(this.listAnuncios[0].img).forEach(element => {
            this.arrayImg.push(this.listAnuncios[0].img[element]);
          }); 
    });
    
    this.ProductService.returnListProducts(key)
    .snapshotChanges()
    .subscribe(data => {
      this.listProducts = [];
      data.forEach(element => {
        let x = element.payload.toJSON();
        x["$key"] = element.key;
        this.listProducts.push(x);
      });
      this.ProductService.SearchProductByName(producto, this.listProducts)
      .subscribe(data => {
        this.product = data;
      })
    });
  }

  menos(){
    if(this.cantProd > 1){ this.cantProd-- }
  }
  mas(){
    this.cantProd++;
  }
  newPedido : Carrito[];
  addToCart(){ 
    this.newPedido = [];
    const producto = this._activatedRoute.snapshot.paramMap.get('producto');     
    const key = this._activatedRoute.snapshot.paramMap.get('key');
    let numeroPedido = localStorage.getItem('numero-pedido');
    this.PedidoService.insertCarrito(key,numeroPedido,this.product, this.cantProd);    
    this.viewCart = true;
  }
}
