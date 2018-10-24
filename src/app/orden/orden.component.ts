import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PedidoService } from '../services/pedido.service';

@Component({
  selector: 'app-orden',
  templateUrl: './orden.component.html',
  styleUrls: ['./orden.component.scss']
})
export class OrdenComponent implements OnInit {

  constructor(private PedidoService : PedidoService, private router: Router, private _activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    const status = this._activatedRoute.snapshot.paramMap.get('status');

    this.PedidoService.updatePago(status);
  }

}
