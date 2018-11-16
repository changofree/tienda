import { Component, OnInit } from '@angular/core';
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
  }

  goProduct(){
    this.router.navigateByUrl("/productos/"+this.Marca);
  }
  goHome(){
    this.router.navigateByUrl("/"+this.Marca);
  }
  ngOnInit() {
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
