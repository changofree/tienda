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



  private value; // private property _item

  // use getter setter to define the property
  get bool(): any {
    console.log("cambiando input");
    this.viewCart = this.value 
    console.log(this.viewCart);
   return ;
  }

  @Input()
  set bool(val: any) {
    console.log("inout");
    this.viewCart = (val == 'true');
    console.log(this.viewCart);
  }

  @Output() boold = new EventEmitter<boolean>();

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
    this.router.navigateByUrl("/productos/"+this.Marca);
  }
  goHome(){
    this.router.navigateByUrl("/"+this.Marca);
  }

  ngOnInit() {
    let component = this._activatedRoute.snapshot.component.toString();
    let array = component.split("(");
    if(array[0] === "function HomewebComponent"){
      this.Inicio = "activo";
      this.Nosotros = "false";
      this.Producto = "false";
    }else{
      this.Inicio = "false";
      this.Producto = "activo";
    }
    
    // console.log(this._activatedRoute.snapshot.component);
    this.viewCart = false;
    const key = this._activatedRoute.snapshot.paramMap.get('key');     
    this.dashboard.returnListClients()
    .snapshotChanges()
    .subscribe(data => {
      data.forEach(element => { 
        let x = element.payload.toJSON();
        x["$key"] = element.key;
        if(x["$key"] === key){
          this.Marca = x["marca"];          
        }
      });
    });

  }

}
