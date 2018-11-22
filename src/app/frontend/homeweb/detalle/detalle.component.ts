import { Component, OnInit, PLATFORM_ID, Inject  } from '@angular/core';
import { Product } from '../../../interfaces/product';
import { Category } from '../../../interfaces/category';
import { Anuncio } from '../../../anuncio';
import { DashboardService } from '../../../dashboard.service';
import { ProductoService } from '../../../services/producto.service';
import { AnunciosService } from '../../../anuncios.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Cliente } from '../../../interfaces/cliente';
import { PedidoService } from '../../../services/pedido.service';
import { Carrito } from '../../../interfaces/carrito';
import { NavigationEnd } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

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
  
  positionInitial = 0;
  cantProd = 1;
  client : Cliente;
  viewMore : boolean = true;
  buttonEdit : boolean = true;
  keyPedido : string;
  newPedido : Carrito[];
  WhatsApp : string;

  constructor(
    private PedidoService : PedidoService, 
    private dashboard : DashboardService,
    private ProductService: ProductoService,
    private AnuncioService : AnunciosService,
    private _activatedRoute: ActivatedRoute,
    private router : Router
  ) 
  {
    this.viewCart = false;
    this.product = {
      name:"",
      code:"",
      price:"",
      offer:"",
      category:"",
      description:"",
      stock:null,
      img:["","","",""],
      keyClient: "",
      data:""
    }
  }

  
  changeBoolean(event){
    console.log("se cambio el valor");
    this.viewCart = false;
    console.log(this.viewCart)
  }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0)
  });
    this.Marca = "";
    this.WhatsApp = "";
    let clienteOnline = localStorage.getItem("cliente-chango");
    const key = this._activatedRoute.snapshot.paramMap.get('key');
    const producto = this._activatedRoute.snapshot.paramMap.get('producto');     
    let numeroPedido = localStorage.getItem('numero-pedido');
    this.keyPedido = localStorage.getItem('key-pedido');
    const carrito = this.PedidoService.returnListCarrito(key);
    this.Marca = key;
    this.cantProd = 1;
    this.Carrito = null;
    this.view = true;
    let aux : Cliente[];
    aux = [];
    this.arrayImg = ["", "", "" ,""]; //  Guardamos toda las url en este array.
    
    //  Si el cliente no se logeo, no se muestra boton de configuracion
    if(clienteOnline === undefined || clienteOnline === null){
      this.buttonEdit = false;
    } 


    let boolauxtwo = true;  // Si el el numero de pedido era nulo o no exisitia, se retorna un false;
    if(numeroPedido === undefined || numeroPedido === null || this.keyPedido === null || this.keyPedido === undefined){
      this.PedidoService.insertNewCarrito(key);
      boolauxtwo = false;
    }

    let boolaux = true;
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

      //Si no se agrego ningun nuevo pedido anteriormente, se genera ahora.
      if(boolaux && boolauxtwo){
        if(this.Carrito.length === 0 || this.Carrito === undefined){
          this.PedidoService.insertNewCarrito(key);
        }else{
        this.Carrito.forEach(element => {
          if(element.keyfb !== this.keyPedido){
            this.PedidoService.insertNewCarrito(key);
            boolaux = false;
          }
        });
        }
        boolauxtwo = false; // Cerramos el blucle para proximas actualizaciones
      }
    });
     
    
    //  Validamos el boton para ir a la configuracion de la web
    this.dashboard.returnListClients()
    .snapshotChanges()
    .subscribe(data => {
      data.forEach(element => {
        let x = element.payload.toJSON();
        x["$key"] = element.key;
        if(x["$key"] === key){
          aux.push(x);
          if(x["email"] === clienteOnline){
            this.buttonEdit = true;
          }else{
            this.buttonEdit = false;
          }
        }
      });

      // Actualizamos la cantidad de visitas      
      this.client = aux[0];
      this.WhatsApp = this.client.web.whatsapp;
      if(aux[0].web.view !== undefined){
        aux[0].web.view = aux[0].web.view + 1;
      }else{
        aux[0].web.view = 1;
      }


      //  Update de visistas.
      if(this.view){
        this.view = false;
        this.dashboard.updateVisitas(key, aux[0]);
      }

    });
    
    //  Cargamos todoas las imagenes del producto que se esta detallando.
    this.AnuncioService.returnListAnuncios(key)
    .snapshotChanges()
    .subscribe(data => {
      this.listAnuncios = [];
      data.forEach(element => {
        let x = element.payload.toJSON();
        x["$key"] = element.key;
        this.listAnuncios.push(x as Anuncio);
      });
      this.arrayImg = []; //  Guardamos toda las url en este array.
        Object.keys(this.listAnuncios[0].img).forEach(element => {
          this.arrayImg.push(this.listAnuncios[0].img[element]);
        }); 
    });

    //  Listamos todos los productos para darle valor a la variable RT de firbase. Filtramos por el producto detallado.
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
      });
    });

  }

  menos(){  //Uno menos a la cantidad
    if(this.cantProd > 1){
      this.cantProd-- 
    }
  }
  mas(){  //  Uno mas a la cantidad
    this.cantProd++;
  }
  
  //  Tomamos toda la informacion necesaria para generar un nuevo item de carrito y se la mandamos a firebase.
  addToCart(){ 
    this.newPedido = [];
    const producto = this._activatedRoute.snapshot.paramMap.get('producto');     
    const key = this._activatedRoute.snapshot.paramMap.get('key');
    let numeroPedido = localStorage.getItem('numero-pedido');

    this.PedidoService.insertCarrito(key,numeroPedido,this.product, this.cantProd);    
    this.viewCart = true;
    
  }
}
