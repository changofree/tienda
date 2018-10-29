import { Component, OnInit } from '@angular/core';
import { PedidoService } from 'app/services/pedido.service';
import { ProductoService } from 'app/services/producto.service';
import { Cliente } from 'app/interfaces/cliente';

@Component({
  selector: 'app-soporte',
  templateUrl: './soporte.component.html',
  styleUrls: ['./soporte.component.scss']
})
export class SoporteComponent implements OnInit {

  mensaje : string; 
  cliente : Cliente;
  mensajes : any[];

  constructor(
    private pedidoService : PedidoService,
    private productoService : ProductoService
  ) { }

  ngOnInit() {
    this.mensaje = "";
    const email = localStorage.getItem("cliente-chango");
    this.productoService.getListClientsWithSnap()
    .snapshotChanges()
    .subscribe(data => {
      data.forEach(element => {
        let x = element.payload.toJSON();
        x["$key"] = element.key;
        if(x["email"] === email){
          this.cliente = x;
        }
      });
      this.pedidoService.soporteList(this.cliente.$key)
      .snapshotChanges()
      .subscribe(data => {
        this.mensajes = [];
        data.forEach(element => {
          let x = element.payload.toJSON();
          x["$key"] = element.key;
          this.mensajes.push(x);
        }); 
      });
    });


  }

  enviar(){
    this.pedidoService.inserNewSoporte(this.mensaje);
    this.mensaje = "";
  }
}
