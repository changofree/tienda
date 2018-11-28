import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DashboardService } from 'app/dashboard.service';
// import * as functionJS from 'hola';
// import * as pixel from '../../../src/pixel';  
// import * as variable from 'variableName';
// declare var System: any; 
// declare var pixel: any;
declare var myModule: { myFunction: Function, pixelFacebook: Function};

@Component({
  selector: 'app-global',
  templateUrl: './global.component.html',
  styleUrls: ['./global.component.scss']
})
export class GlobalComponent implements OnInit {

  numberPixel;
  constructor(
    private activatedRoute : ActivatedRoute,
    private dashboardService : DashboardService
    ) { }
     
    ngOnInit() {
    const tienda = this.activatedRoute.snapshot.paramMap.get("key");
    this.dashboardService.returnListClients()
    .snapshotChanges()
    .subscribe(data => {
      let aux = [];
      data.forEach(element => {
        let x = element.payload.toJSON();
        x["$key"] = element.key;
        if(x["$key"] === tienda){
          if(x["web"]["pixel"] !== undefined){
            this.numberPixel = x["web"]["pixel"];
          }
        }
      });
      myModule.pixelFacebook(this.numberPixel);
    });

  }
  
  
} 
