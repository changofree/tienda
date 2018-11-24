import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ProductoService } from '../services/producto.service';
import { Product } from '../interfaces/product';
import { Cliente } from '../interfaces/cliente';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {

  /****************************** LISTADO DE PRODUCTOS ******************************/
  listProducts : Product[];

  constructor(
    private ProductService : ProductoService,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    let email = localStorage.getItem("cliente-chango");
    this.ProductService.getListClientsWithSnap()
    .snapshotChanges()
    .subscribe(data => {
      const listClients = [];
      let keyClient;
      data.forEach(element => {
        let x = element.payload.toJSON();
        x["$key"] = element.key;
        listClients.push(x as Cliente);
      });
      
      listClients.forEach(element => {
        if(element.email === email){
          keyClient = element.$key;
        } 
      });
      this.ProductService.returnListProductsOrderByStock(keyClient)
      .snapshotChanges()
      .subscribe(data => {
        this.listProducts = [];
          data.forEach(element => {
            let y = element.payload.toJSON();
            y["$key"] = element.key;
            this.listProducts.push(y as Product);
          });
        });
    });
  }

  DestroyThis(key){
    this.ProductService.deleteProduct(key);
  }
  
}
