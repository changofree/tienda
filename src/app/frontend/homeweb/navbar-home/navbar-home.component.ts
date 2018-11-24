import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { PedidoService } from 'app/services/pedido.service';
import { DashboardService } from 'app/dashboard.service';
import { ActivatedRoute, Router } from '@angular/router';

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

  constructor(
    private dashboard : DashboardService,
    private _activatedRoute: ActivatedRoute,
    private router : Router
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

  ngOnInit() {
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
    const key = this._activatedRoute.snapshot.paramMap.get('key');     
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
        }
      });
      let color = document.getElementsByClassName("colorCliente") as HTMLCollectionOf<HTMLElement>;

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
		  for (var i=0; i<color.length; i++){
        setCssTextStyle(color[i], "background", this.Color.toString() +"!important");
      } 
    });

  }

}
