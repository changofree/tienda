import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { Category } from '../../interfaces/category';
import { ActivatedRoute } from '@angular/router';
import { DashboardService } from '../../dashboard.service';
import { Cliente } from '../../interfaces/cliente';

@Component({
  selector: 'app-footerweb',
  templateUrl: './footerweb.component.html',
  styleUrls: ['./footerweb.component.scss']
})
export class FooterwebComponent implements OnInit {

  listCategory : Category[];
  listClients : Cliente[];

  constructor(
    private dashboard : DashboardService,
    private ProductService : ProductoService,
    private _activatedRoute: ActivatedRoute
  ){}

  ngOnInit() {
    const key = this._activatedRoute.snapshot.paramMap.get('key');     

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
        if(x["$key"] === key)
        this.listClients.push(x);
      });
    });
  }
}