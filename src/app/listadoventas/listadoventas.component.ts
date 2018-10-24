import { Component, OnInit } from '@angular/core';
import { PedidoService } from 'app/services/pedido.service';
import { ProductoService } from 'app/services/producto.service';

@Component({
  selector: 'app-listadoventas',
  templateUrl: './listadoventas.component.html',
  styleUrls: ['./listadoventas.component.scss']
})
export class ListadoventasComponent implements OnInit {

/****************** MISMO FUNCIONAMIENTO QUE LISTADO DE PEDIDOS ***************************/


  listPedido : any[];
  listCarrito: any[];
  infoPedido : any[];
  moreIfno : any;

  constructor(
    private pedidoService : PedidoService,
    private clientService : ProductoService,
  ){}

/************************************************************************ */
 
ngOnInit() {
    let cliente = localStorage.getItem("cliente-chango");
    let clientArray = [];
    
    this.clientService.getListClientsWithSnap()
    .snapshotChanges()
    .subscribe(data => {
      data.forEach(element => {
        let y = element.payload.toJSON();
        y["$key"] = element.key
        if(cliente === y["email"]){
          clientArray.push(y);
        }
      });
      this.pedidoService.getPedidos(clientArray[0].$key)
      .snapshotChanges()
      .subscribe(data => {
        this.listPedido = [];
        data.forEach(element => {
          let x = element.payload.toJSON();
          x["$key"] = element.key;
          if(x["status"] === 2)
          this.listPedido.push(x);
        });
      });
      this.pedidoService.returnListCarrito(clientArray[0].$key)
      .snapshotChanges()
      .subscribe(data => {
        this.listCarrito = [];
        data.forEach(element => {
            let z = element.payload.toJSON();
            z["$key"] = element.key;
            this.listCarrito.push(z);
        });
      });
    });
  }

/*************************************************************************/

  changeInfo(pedidoObject){
    this.infoPedido = [];
    this.moreIfno = pedidoObject;
    this.listCarrito.forEach(element => {
      if(parseInt(element.numeroPedido) === parseInt(pedidoObject.pedido)){
        this.infoPedido.push(element);
      }
    });
  }

/*************************************************************************/

  GoVenta(pedido){
    this.pedidoService.updatePedido(pedido);
  }


}
