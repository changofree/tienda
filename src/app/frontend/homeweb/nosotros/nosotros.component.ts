import { Component, OnInit } from '@angular/core';
import { Cliente } from 'app/interfaces/cliente';
import { DashboardService } from 'app/dashboard.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-nosotros',
  templateUrl: './nosotros.component.html',
  styleUrls: ['./nosotros.component.scss']
})
export class NosotrosComponent implements OnInit {

  clienteInfo : Cliente;

  constructor(
    private dashboard : DashboardService,
    private _activatedRoute : ActivatedRoute
  )
  {

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
          this.clienteInfo = x;
        }
      });
      
    });
  }

}
