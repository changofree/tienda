import { Component, OnInit, Input } from '@angular/core';
import { AnunciosService } from '../anuncios.service';
import { Anuncio } from '../anuncio';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Product } from '../interfaces/product';
import { ProductoService } from '../services/producto.service';
import { DashboardService } from '../dashboard.service';
import { Cliente } from '../interfaces/cliente';
import { Category } from '../interfaces/category';
import { PedidoService } from 'app/services/pedido.service';

@Component({
  selector: 'app-homeweb',
  templateUrl: './homeweb.component.html',
  styleUrls: ['./homeweb.component.scss']
})
export class HomewebComponent implements OnInit {

  listAnuncios : Anuncio[];
  listProducts : Product[];
  listCategory : Category[];
  listFilter : Product[];

  arrayImg : string[];
  Marca : string;
  view : boolean = true;

  Desde : number = 0;
  Hasta : number = 8;

  viewCart : boolean = false;
  key : string;

  viewMore : boolean = false;
  buttonEdit : boolean = false;

  constructor(
    private dashboard : DashboardService,
    private ProductService: ProductoService,
    private AnuncioService : AnunciosService,
    private _activatedRoute: ActivatedRoute,
    private PedidoService : PedidoService,
    private router : Router
  ){
    this.buttonEdit = false;
  }


  changeBoolean(event){
    this.viewCart = false;
  }
  reload(){
    location.reload();
  }
  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0)
    });
  
    const key = this._activatedRoute.snapshot.paramMap.get('key');     
    let numeroPedido = localStorage.getItem('numero-pedido');
    let clienteOnline = localStorage.getItem("cliente-chango");
    console.log(numeroPedido);
    this.listAnuncios = [];
    this.listFilter = [];
    this.listProducts = [];
    this.arrayImg = ["","",""];
    
    /* ClientOnline is in cokie or ls */
    if(clienteOnline === null){
      this.getCookie();
    }

    // Si el cliente que ingreso a la web no tiene ningun login guardado, no se muestra el boton de configuracion de web.
    clienteOnline = localStorage.getItem("cliente-chango");
    if(clienteOnline === undefined || clienteOnline === null){
      this.buttonEdit = false;
    } 
    
    //  Si no existe ningun pedido por el cliente ingresante, generamos uno.
    if(numeroPedido === undefined || numeroPedido === null){
      this.PedidoService.insertNewCarrito(key);
    }

    this.key = key;
    this.view = true;
    
    let cliente : Cliente;
    this.dashboard.returnListClients()
    .snapshotChanges()
    .subscribe(data => {
      data.forEach(element => { 
        let x = element.payload.toJSON();
        x["$key"] = element.key;
        if(x["$key"] === key){
          cliente = x;
          this.Marca = x["marca"];
          //  Si el email es igual al que está guardado en localstorage, se muestra el boton, en caso contrario, no.
          if(x["email"] === clienteOnline){
            this.buttonEdit = true;
          }else{
            this.buttonEdit = false;
          }
          if(x["web"]["view"] !== undefined || x["web"]["view"] !== null){
            cliente.web.view++;
          }else{
            cliente.web.view = 1;
          }
          // Update de visitas
          if(this.view){
            this.dashboard.updateVisitas(key, cliente);
            this.view = false;
          }
        }
      });
      
    });
    
    //  Traemos todos los anuncion cargados por el cliente para mostrarlos en el carrusel.
    this.AnuncioService.returnListAnuncios(key)
    .snapshotChanges()
    .subscribe(data => {
      data.forEach(element => {
        let x = element.payload.toJSON();
        x["$key"] = element.key;
        this.listAnuncios.push(x as Anuncio);
      });
      this.arrayImg = [];
    
      if(this.listAnuncios[0].img === undefined || this.listAnuncios[0].img === null){  
      }else{
        let cont = true;
        Object.keys(this.listAnuncios[0].img).forEach(element => {
          if(this.listAnuncios[0].img[element] !== ""){
            this.arrayImg.push(this.listAnuncios[0].img[element]);
            cont = false;
          }
        }); 
        if(cont){
          this.arrayImg = ["","",""];
        }
      }
    });

    //  Traemos todos los productos
    this.ProductService.returnListProducts(key)
    .snapshotChanges()
    .subscribe(data => {
      data.forEach(element => {
        let x = element.payload.toJSON();
        x["$key"] = element.key;
        this.listProducts.push(x);
        this.listFilter.push(x);
      });

      //  Contamos la cantidad de productos, si supera los que hay + 8 mostramos el boton mostrar mas.
      if(this.listProducts.length < 8){
        this.viewMore = false;
      }else{
         this.viewMore = true;
      }
    });

  //Guardamos todo el listado de categorias.    
    this.ProductService.returnListCategory(key)
    .snapshotChanges()
    .subscribe(data => {
      this.listCategory = [];
      data.forEach(element => {
        let x = element.payload.toJSON();
        x["$key"] = element.key;
        this.listCategory.push(x as Category);
      });
    });
  }

  // Mostrar mas cantidad de producto si se clickea en el boton
  loadMore(){
    this.Hasta = this.Hasta + 8;
    if(this.listProducts.length < this.Hasta){
      this.viewMore = false;
    }

  }

  /**
   * IMPOIRTANTE IMPORTANTE IMPORTANTER IMPORTANTER IMPORTANTE
   * 
   * Esta funcion trae la cokie generada en changofree.com con los localstorage correspondientes, para asi, darla una mejor
   * usuabilidad a nuestros clientes una vez que se logean en changofree, o se registran.
   */
  getCookie(){
    let cname = "login";
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            localStorage.setItem("cliente-chango",c.substring(name.length, c.length));  
        }
    }
  }

  /**
   * Filtramos por categoria seleccionada en html.
   * @param nameCategory Valor tomado por evento (click) 
   */
  clickFilter(nameCategory?){
    this.listFilter = [];
    if(nameCategory === undefined){
      this.listFilter = this.listProducts
    }
    this.listProducts.forEach(element => {
      if(element.category === nameCategory){
        this.listFilter.push(element);
      }
    });
  }
}
