import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'app/dashboard.service';

@Component({
  selector: 'app-personalizar',
  templateUrl: './personalizar.component.html',
  styleUrls: ['./personalizar.component.scss']
})
export class PersonalizarComponent implements OnInit {

  color : string;
  colorFuente : string;
  key : string;
  web : any;
  Informacion : string;
  google : string;

  constructor(
    private dashboard : DashboardService
  )
  {
    this.color = "";
    this.colorFuente = "";
    this.Informacion = "";
    this.google = "";
  }

  ngOnInit() {
    let cliente = localStorage.getItem("cliente-chango");

    this.dashboard.returnListClients()
    .snapshotChanges()
    .subscribe(data => {
      data.forEach(element => {
        let y = element.payload.toJSON();
        y["$key"] = element.key
        if(cliente === y["email"]){
          this.key = y["$key"];
          this.web = y["web"]; 
        }
      });
    });

  }

  cambiarColor(){
    this.dashboard.updateColor(this.color,this.web, this.key);
  }
  cambiarGoogle(){
    this.dashboard.updateGoogle(this.google,this.web, this.key);
  }
  cambiarColorFuente(){
    this.dashboard.updateColorFuente(this.colorFuente,this.web, this.key);
  }
  cambiarInformacion(){
    this.dashboard.updateInformacion(this.Informacion, this.web, this.key);
  }
}
