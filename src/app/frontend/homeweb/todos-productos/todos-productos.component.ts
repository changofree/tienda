import { Component, OnInit } from '@angular/core';
import { ProductService } from 'app/services/product.service';
import { ProductoService } from 'app/services/producto.service';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'app/interfaces/category';
import { Product } from 'app/interfaces/product';

@Component({
  selector: 'app-todos-productos',
  templateUrl: './todos-productos.component.html',
  styleUrls: ['./todos-productos.component.scss']
})
export class TodosProductosComponent implements OnInit {

  listCategory : Category[];
  listProducts : Product[];
  listFilter : Product[];
  key : string;
  banner : string; 

  categoriaAnterior : any;
  categoriaActual : any;
  ordenAnterior : any;
  ordenActual : any;

  constructor(
    private ProductService : ProductoService,
    private _activatedRoute : ActivatedRoute
  )
  {
    this.listCategory = [];
  }

  ngOnInit() {
    const key = this._activatedRoute.snapshot.paramMap.get('key');     
    const productoBuscado = this._activatedRoute.snapshot.paramMap.get('producto');     
    
    this.key = key; 
    
    this.ProductService.getListClientsWithSnap()
    .snapshotChanges()
    .subscribe(data => {
      data.forEach(element => {
        let x = element.payload.toJSON();
        x["$key"] = element.key;
        if(x["$key"] === this.key){
          this.banner = x["web"]["banner"];
        }
      });
    })
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
    this.ProductService.returnListProducts(key)
    .snapshotChanges()
    .subscribe(data => {
      this.listProducts = [];
      this.listFilter = [];
      data.forEach(element => {
        let x = element.payload.toJSON();
        x["$key"] = element.key;
        this.listProducts.push(x);
        this.listFilter.push(x);
      });
      if(productoBuscado !== null){
        this.listFilter = [];
        this.listProducts.forEach(element => {
          if(element.name.toUpperCase().match(productoBuscado.toUpperCase())){
            this.listFilter.push(element);
          }
        });
      }
    });

  }

  clickFilter(nameCategory?){
    if(nameCategory === "0"){
      this.listFilter = this.listProducts;
    }else{

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
  ordenar(event){
    console.log(event);
    this.listFilter = this.listProducts;
    let l = this.listFilter.length;
    
    if(event === "mayor"){

      for (let i = 0; i < l; i++ ) {
        for (let j = 0; j < l - 1 - i; j++ ) {
          if ( this.listFilter[ j ].price < this.listFilter[ j + 1 ].price ) {
            [ this.listFilter[ j ], this.listFilter[ j + 1 ] ] = [ this.listFilter[ j + 1 ], this.listFilter[ j ] ];
          }
        }  
      }

    }else if(event === "menor"){

      for (let i = 0; i < l; i++ ) {
        for (let j = 0; j < l - 1 - i; j++ ) {
          if ( this.listFilter[ j ].price > this.listFilter[ j + 1 ].price ) {
            [ this.listFilter[ j ], this.listFilter[ j + 1 ] ] = [ this.listFilter[ j + 1 ], this.listFilter[ j ] ];
          }
        }  
      }

    }else{
      this.listFilter = this.listProducts;
    }
  }

  selectCategory(category){
    this.categoriaActual = category;
    if(this.categoriaAnterior === undefined){
      this.categoriaAnterior = category;
      document.getElementById(category).style.background = "black";
      document.getElementById(category).style.color = "white";
    }else{
      document.getElementById(this.categoriaAnterior).style.color = "black";
      document.getElementById(this.categoriaAnterior).style.background = "transparent";
      this.categoriaAnterior = category;
      document.getElementById(category).style.background = "black";
      document.getElementById(category).style.color = "white";
    }
  }

  selectPrecio(bool){
    this.ordenActual = bool;
    if(this.ordenAnterior === undefined){
      this.ordenAnterior = bool;
      document.getElementById(bool).style.background = "black";
      document.getElementById(bool).style.color = "white";
    }else{
      document.getElementById(this.ordenAnterior).style.color = "black";
      document.getElementById(this.ordenAnterior).style.background = "transparent";
      this.ordenAnterior = bool;
      document.getElementById(bool).style.background = "black";
      document.getElementById(bool).style.color = "white";
    }
  }

  //OrdenActual = true = Por mayor
  //OrdenActual = false = Por menor

  applyFilter(){
    console.log(this.ordenActual);
    this.listFilter = this.listProducts;
    let l = this.listFilter.length;
    if(this.ordenActual !== undefined){
      if(this.ordenActual){

        for (let i = 0; i < l; i++ ) {
          for (let j = 0; j < l - 1 - i; j++ ) {
            if ( this.listFilter[ j ].price < this.listFilter[ j + 1 ].price ) {
              [ this.listFilter[ j ], this.listFilter[ j + 1 ] ] = [ this.listFilter[ j + 1 ], this.listFilter[ j ] ];
            }
          }  
        }

      }else if(!this.ordenActual){

        for (let i = 0; i < l; i++ ) {
          for (let j = 0; j < l - 1 - i; j++ ) {
            if ( this.listFilter[ j ].price > this.listFilter[ j + 1 ].price ) {
              [ this.listFilter[ j ], this.listFilter[ j + 1 ] ] = [ this.listFilter[ j + 1 ], this.listFilter[ j ] ];
            }
          }  
        }
      } 
    }
    if(this.categoriaActual !== undefined){
      let aux = this.listFilter;
      this.listFilter = [];
      aux.forEach(element => {
        if(element.category === this.categoriaActual){
          this.listFilter.push(element);
        }
      });
    }
  }


}
