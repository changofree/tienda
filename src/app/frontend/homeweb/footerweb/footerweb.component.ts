import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../../services/producto.service';
import { Category } from '../../../interfaces/category';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardService } from '../../../dashboard.service';
import { Cliente } from '../../../interfaces/cliente';

@Component({
  selector: 'app-footerweb',
  templateUrl: './footerweb.component.html',
  styleUrls: ['./footerweb.component.scss']
})
export class FooterwebComponent implements OnInit {

  listCategory : Category[];
  listClients : Cliente[];
  Color : string;
  WhatsApp : string;
  Facebook : string;
  Instagram: string;
  key : string;
  ColorFuente : string;
  informacion : string;

  constructor(
    private dashboard : DashboardService,
    private ProductService : ProductoService,
    private _activatedRoute: ActivatedRoute,
    private router : Router
  ){}

  ngOnInit() {
    const key = this._activatedRoute.snapshot.paramMap.get('key'); 
    this.key = key;    
    this.Facebook = "";
    this.WhatsApp = "";
    this.Instagram = "";

    //  Listamos todas las categorias existentes.
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
    
    //  Listamos toda la informacion del dueño de la tienda.
    this.dashboard.returnListClients()
    .snapshotChanges()
    .subscribe(data => {
      this.listClients = [];
      data.forEach(element => {
        let x = element.payload.toJSON();
        x["$key"] = element.key;
        if(x["$key"] === key){
          this.listClients.push(x); 
          this.Color = x["web"]["color"];
          this.ColorFuente = x["web"]["colorFuente"];
          this.informacion = x["web"]["informacion"];
        }
      });
      console.log(this.informacion);
      this.Facebook = this.listClients[0].web.facebook;
      this.WhatsApp = this.listClients[0].web.whatsapp;
      this.Instagram = this.listClients[0].web.instagram;
  
      let colorFuente = document.getElementsByClassName("colorFuente") as HTMLCollectionOf<HTMLElement>;
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
      for(var i=0; i<colorFuente.length; i++){
        setCssTextStyle(colorFuente[i], "color", this.ColorFuente +"!important");
      }
		  for (var i=0; i<color.length; i++){
        setCssTextStyle(color[i], "background", this.Color +"!important");
      } 



      let fechaTotal = this.listClients[0].hasta.split("/");  // 0 = dia , 1 = mes , 2 = año

      let f = new Date();        

      let diaActual = Number(f.getDate());
      let mesActual = Number(f.getMonth()); 
      let anoActual = Number(f.getFullYear());
      
      if(Number(fechaTotal[1]) <= mesActual && Number(fechaTotal[2]) <= anoActual && Number(fechaTotal[0]) <= diaActual){
        this.router.navigateByUrl("/validacion")        
      }

     
    });
  }
}