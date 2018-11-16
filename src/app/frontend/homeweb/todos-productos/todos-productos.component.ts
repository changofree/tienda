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

  constructor(
    private ProductService : ProductoService,
    private _activatedRoute : ActivatedRoute
  )
  {
    this.listCategory = [];
  }

  ngOnInit() {
    const key = this._activatedRoute.snapshot.paramMap.get('key');     

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
    });

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
  ordenMenor(){
    this.listFilter = this.listProducts;
    let l = this.listFilter.length;

    for (let i = 0; i < l; i++ ) {
      for (let j = 0; j < l - 1 - i; j++ ) {
        if ( this.listFilter[ j ].price < this.listFilter[ j + 1 ].price ) {
          [ this.listFilter[ j ], this.listFilter[ j + 1 ] ] = [ this.listFilter[ j + 1 ], this.listFilter[ j ] ];
        }
      }
    }
    console.log(this.listFilter);
  }

}
