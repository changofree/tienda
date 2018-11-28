import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { PedidoService } from 'app/services/pedido.service';
import { DashboardService } from 'app/dashboard.service';
import { ActivatedRoute, Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-navbar-home',
  templateUrl: './navbar-home.component.html',
  styleUrls: ['./navbar-home.component.scss']
})
export class NavbarHomeComponent implements OnInit {
  
  Marca : String;
  viewCart : Boolean;
  Inicio : string;
  Producto : string;
  Nosotros : string;
  key : any;
  ProductosCarritos : number;
  logo : string;

  private value; // private property _item

  // use getter setter to define the property
  get bool(): any {
    this.viewCart = this.value 
   return ;
  }

  @Input()
  set bool(val: any) {
    this.viewCart = (val == 'true');
  }

  @Output() boold = new EventEmitter<boolean>();

  Color: string;
  ColorFuente : string;
  oferta : string;

  constructor(
    private dashboard : DashboardService,
    private _activatedRoute: ActivatedRoute,
    private router : Router,
    private PedidoService : PedidoService
    ) 
  {
    this.Marca = "";
    this.viewCart = false;
  }
  

  changeBoolean(event){
    this.viewCart = false;
    console.log(this.viewCart);
    this.boold.emit(false);
  }

  goProduct(){
    this.router.navigateByUrl("/productos/"+this.key);
  }
  goHome(){
    this.router.navigateByUrl("/"+this.key);
  }

  goNosotros(){
    this.router.navigateByUrl("/nosotros/"+this.key);    
  }

  boolTiempo : boolean;
  hola(){
    this.boolTiempo = false;
  }
  tiempo(ahora){
    setTimeout(() => {
      let data = new Date() 
      let minute = data.getMinutes()
      let suma;
      if((minute - ahora) === 2 && this.oferta !== undefined){
        this.boolTiempo = true;
      }else{
       this.tiempo(ahora); 
      }

    }, 1000)
  }
  ngOnInit() {
    this.boolTiempo = false;

    let data = new Date() 
    let minute = data.getMinutes() 
    let ahora = minute;

    this.tiempo(ahora);
    




    
    localStorage.removeItem('firebase:previous_websocket_failure');
    
    /**
     * Cantidad de productos en el carrito
     */
    const key = this._activatedRoute.snapshot.paramMap.get('key');
    const producto = this._activatedRoute.snapshot.paramMap.get('producto');     
    let numeroPedido = localStorage.getItem('numero-pedido');
    let KeyPedido = localStorage.getItem("key-pedido");
    const carrito = this.PedidoService.returnListCarrito(key); // Damos valor a la variable de RealTime database de FB para luego hacer el listado.
    this.key = key;
    
    carrito.snapshotChanges()
    .subscribe(data => {
    let cantCarrito = [];      
      data.forEach(element => {
        let y = element.payload.toJSON();
        y["$key"] = element.key;
        if(parseInt(y["numeroPedido"]) === parseInt(numeroPedido) ){    //Numero pedido tomado por localStorage para poder darle tiempo de vida al carrito de cada cliente.
          cantCarrito.push(y);
        }
      });
      this.ProductosCarritos = cantCarrito.length;
    });
    let href = this.router.url;
    let search = "/productos/";
    let searchtwo = "/nosotros/";

    if(href.indexOf(search) !== -1){
      this.Inicio = "false";
      this.Nosotros = "false";
      this.Producto = "activo";
    }else if(href.indexOf(searchtwo) !== -1){
      this.Nosotros = "activo"
      this.Inicio = "false";
      this.Producto = "false";
    }else{
      this.Nosotros = "false";
      this.Inicio = "activo";
      this.Producto = "false";  
    }
    this.viewCart = false;
    this.key = key;
    this.dashboard.returnListClients()
    .snapshotChanges()
    .subscribe(data => {
      data.forEach(element => { 
        let x = element.payload.toJSON();
        x["$key"] = element.key;
        if(x["$key"] === key){
          this.Marca = x["marca"];          
          this.Color = x["web"]["color"];
          this.oferta = x["web"]["oferta"];
          if(x["web"]["logo"] !== undefined){
            this.logo = x["web"]["logo"]
          }
          this.ColorFuente = x["web"]["colorFuente"];
        }
      });
      console.log(this.oferta);
      document.title = "Tienda Online - "+this.Marca;
      let color = document.getElementsByClassName("colorCliente") as HTMLCollectionOf<HTMLElement>;
      let colorFuente = document.getElementsByClassName("colorFuente") as HTMLCollectionOf<HTMLElement>;

      function setCssTextStyle(el, style, value) {
        var result = el.style.cssText.match(new RegExp("(?:[;\\s]|^)(" +
            style.replace("-", "\\-") + "\\s*:(.*?)(;|$))")),
          idx;
        if (result) {
          idx = result.index + result[0].indexOf(result[1]);
          el.style.cssText = el.style.cssText.substring(0, idx) +
            style + ": " + value + ";" +
            el.style.cssText.substring(idx + result[1].length);
        } else {
          el.style.cssText += " " + style + ": " + value + ";";
        }
      }
      for(var i=0; i<colorFuente.length; i++){
        setCssTextStyle(colorFuente[i], "color", this.ColorFuente +"!important");
      }
		  for (var i=0; i<color.length; i++){
        setCssTextStyle(color[i], "background", this.Color +"!important");
      } 
    });

  }

}
