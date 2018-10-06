import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../services/producto.service';
import { Cliente } from '../interfaces/cliente';
import { Category } from '../interfaces/category';
import {MatSnackBar} from '@angular/material';


@Component({
  selector: 'app-table-categoria',
  templateUrl: './table-categoria.component.html',
  styleUrls: ['./table-categoria.component.scss']
})
export class TableCategoriaComponent implements OnInit {

  listCategory : Category[];
  nameCategory : string;
  Clients : Cliente[];
  constructor(private ProductService: ProductoService, public snackBar: MatSnackBar) { }

  ngOnInit() {
    const email = localStorage.getItem("chango-cliente");
    this.ProductService.getListClientsWithSnap()
    .snapshotChanges()
    .subscribe(data => {
      this.Clients = [];
      data.forEach(element => {
        let x = element.payload.toJSON();
        x["$key"] = element.key;
        if(x["email"] === email){
          this.Clients.push(x);
        } 
      });
      this.ProductService.returnListCategory(this.Clients[0].$key)
      .snapshotChanges()
      .subscribe(dataTwo => {
        this.listCategory = [];
        dataTwo.forEach(element => {
          let y = element.payload.toJSON();
          y["$key"] = element.key;
          this.listCategory.push(y as Category);
        });
      })
    })
  }

  addCategory(){
    this.ProductService.insertCategory(this.nameCategory);
  }
  borrarCategoria(key){
    this.listCategory.forEach(element => {
      if(element.$key === key){
        this.ProductService.returnListProducts(this.Clients[0].$key)
        .snapshotChanges()
        .subscribe(data => {
          let x = true;
          data.forEach(elementEach => {
              let y = elementEach.payload.toJSON();
              y["$key"] = elementEach.key;
              if(y["category"] === element.name){
                this.openSnackBar("Usted tiene uno o más productos en esta categoría, si desea borrarla, por favor primero borre los productos.", "Ok!");
                x = false;
              }
            });
            if(x)
            this.ProductService.deleteCategory(key);
          })
        }
      });
      
  }
  
  openSnackBar(message, action) {
    this.snackBar.open(message, action, {
      duration: 15000,
    });
  }

}
