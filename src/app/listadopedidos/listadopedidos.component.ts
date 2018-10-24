import { Component, OnInit } from '@angular/core';
import { PedidoService } from 'app/services/pedido.service';
import { ProductoService } from 'app/services/producto.service';

@Component({
  selector: 'app-listadopedidos',
  templateUrl: './listadopedidos.component.html',
  styleUrls: ['./listadopedidos.component.scss']
})
export class ListadopedidosComponent implements OnInit {

  listPedido : any[];
  listCarrito: any[];
  infoPedido : any[];
  moreIfno : any;

  constructor(
    private pedidoService : PedidoService,
    private clientService : ProductoService,
  ) { }

/************************************************************************ */
 
ngOnInit() {
    let cliente = localStorage.getItem("cliente-chango");
    let clientArray = [];
    
    // Filtramos listado de clientes por el cliente online.
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
      //  Traemos todos los pedidos.
      this.pedidoService.getPedidos(clientArray[0].$key)
      .snapshotChanges()
      .subscribe(data => {
        this.listPedido = [];
        data.forEach(element => {
          let x = element.payload.toJSON();
          x["$key"] = element.key;
          if(x["status"] === 1)
          this.listPedido.push(x);
        });
      });

      //  Todos los item de carritos generados.
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

  /**
  * Filtramos los item de carrito por el pedido seleccionado
  * @param pedidoObject 
  */
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

  //  Cambiar el pedido por venta.
  GoVenta(pedido){
    this.pedidoService.updatePedido(pedido);
  }


}
