import { Component, OnInit, Input } from '@angular/core';
import { AnunciosService } from '../anuncios.service';
import { Anuncio } from '../anuncio';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../interfaces/product';
import { ProductoService } from '../services/producto.service';
import { DashboardService } from '../dashboard.service';
import { Cliente } from '../interfaces/cliente';
import { Category } from '../interfaces/category';

@Component({
  selector: 'app-homeweb',
  templateUrl: './homeweb.component.html',
  styleUrls: ['./homeweb.component.scss']
})
export class HomewebComponent implements OnInit {

  listAnuncios : Anuncio[];
  listProducts : Product[];
  listCategory : Category[];
  listFilter : Product[];

  arrayImg : string[];
  Marca : string;
  view : boolean = true;

  Desde : number = 0;
  Hasta : number = 8;

  viewCart : boolean = false;
  key : string;
  constructor(private dashboard : DashboardService,private ProductService: ProductoService,private AnuncioService : AnunciosService, private router: Router, private _activatedRoute: ActivatedRoute) { }



  changeBoolean(event){
    this.viewCart = false;
  }

  ngOnInit() {
    this.view = true;
    let aux : Cliente[];
    aux = [];

    const key = this._activatedRoute.snapshot.paramMap.get('key');     
    this.key = key;
    this.dashboard.returnListClients()
    .snapshotChanges()
    .subscribe(data => {
      data.forEach(element => {
        let x = element.payload.toJSON();
        x["$key"] = element.key;
        if(x["$key"] === key)
        aux.push(x);
      });
      if(aux[0].web.view !== undefined){
        aux[0].web.view = aux[0].web.view + 1;
      }else{
        aux[0].web.view = 1;
      }
      this.Marca = aux[0].web.name;
      console.log(this.view);
      if(this.view){
        this.view = this.dashboard.updateVisitas(key, aux[0]);
      }
    });
    
    this.listAnuncios = [];
    this.AnuncioService.returnListAnuncios(key)
    .snapshotChanges()
    .subscribe(data => {
      data.forEach(element => {
        let x = element.payload.toJSON();
        x["$key"] = element.key;
        this.listAnuncios.push(x as Anuncio);
      });
      this.arrayImg = [];
          Object.keys(this.listAnuncios[0].img).forEach(element => {
            this.arrayImg.push(this.listAnuncios[0].img[element]);
          }); 
    });
    
    this.ProductService.returnListProducts(key)
    .snapshotChanges()
    .subscribe(data => {
      this.listFilter = [];
      this.listProducts = [];
      data.forEach(element => {
        let x = element.payload.toJSON();
        x["$key"] = element.key;
        this.listProducts.push(x);
        this.listFilter.push(x);
      });
    });
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
  }


  loadMore(){
    this.Hasta = this.Hasta + 8;
  }


  clickFilter(nameCategory?){
    this.listFilter = [];
    if(nameCategory === undefined){
      this.listFilter = this.listProducts
    }
    this.listProducts.forEach(element => {
      if(element.category === nameCategory){
        this.listFilter.push(element);
      }
    });
  }
}
