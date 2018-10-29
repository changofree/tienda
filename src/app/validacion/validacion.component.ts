import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'app/services/producto.service';
import { Cliente } from 'app/interfaces/cliente';
import { PedidoService } from 'app/services/pedido.service';

@Component({
  selector: 'app-validacion',
  templateUrl: './validacion.component.html',
  styleUrls: ['./validacion.component.scss']
})
export class ValidacionComponent implements OnInit {

  Email : string;
  listClient : Cliente[];
  constructor(
    private ClienteService : ProductoService,
    private PedidoService : PedidoService
  ){}

  ngOnInit() {
    this.ClienteService.getListClientsWithSnap()
    .snapshotChanges()
    .subscribe(data => {
      this.listClient = [];
      data.forEach(element => {
        let x = element.payload.toJSON()
        x["$key"] = element.key;
        this.listClient.push(x);
      });
    });
  }

  SendInfo(){
    let BooleanEmail = false;
    this.listClient.forEach(element => {
      if(element.email === this.Email){
        BooleanEmail = true;
      }
    });
    if(BooleanEmail){

    }
  }
}
