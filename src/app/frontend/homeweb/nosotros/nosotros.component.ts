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
  informacion : string;
  googleIframe : string;
  boolGoogle;
  constructor(
    private dashboard : DashboardService,
    private _activatedRoute : ActivatedRoute
  )
  {
this.boolGoogle = false;
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
          if(x["web"]["informacion"] !== undefined){ 
            this.informacion = x["web"]["informacion"];
          }
          if(x["web"]["google"] !== undefined){
            this.googleIframe = x["web"]["google"];
          }
        }
      });
      // var js = document.createElement("script");
      // js.type = "text/javascript";
      // js.innerHTML = layout[i].text + "//# sourceURL=test_file_name.js";
      if(this.googleIframe !== undefined){
        
        let valorIframe = this.googleIframe.split("iframe src=");
        let valueIframe = valorIframe[1].split("width=");
        this.googleIframe = valueIframe[0].replace(/['"]+/g, '');
        this.boolGoogle = true;

        var maps = document.getElementById("maps");
        var ifram = document.createElement("iframe");
        ifram.src = this.googleIframe;
        ifram.frameBorder = "0";
        ifram.style.border ="0";
        ifram.style.width="100%";
        ifram.style.height="350px";

        maps.appendChild(ifram);

      }else{

        this.boolGoogle = false;
      }
    });
  }

}
