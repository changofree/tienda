import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'app/dashboard.service';

@Component({
  selector: 'app-pixelfb',
  templateUrl: './pixelfb.component.html',
  styleUrls: ['./pixelfb.component.scss']
})
export class PixelfbComponent implements OnInit {

  numerPixel : string;
  key : string;
  web;
  
  constructor(
    private dashboardService : DashboardService
  ) 
  {
    this.numerPixel = ""; 
  }

  ngOnInit() {
    let email = localStorage.getItem("cliente-chango");
    this.dashboardService.returnListClients()
    .snapshotChanges()
    .subscribe(data => {
      let aux = [];
      data.forEach(element => {
        let x = element.payload.toJSON();
        x["$key"] = element.key;
        if(x["email"] === email){
          this.key = x["$key"];
          this.web = x["web"];
          if(x["web"]["pixel"] !== undefined){
            this.numerPixel = x["web"]["pixel"];
          }
        }
      });
    });
  }
  updatePixel(){
    this.dashboardService.updatePixel(this.numerPixel,this.web,this.key);
  }
}
