import { Injectable } from '@angular/core';
import { of } from 'rxjs/observable/of';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Product } from './interfaces/product';
import { Cliente } from './interfaces/cliente';
import { Observable } from 'rxjs-compat';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import { WebTemplate } from './interfaces/web-template';

@Injectable()
export class DashboardService {

  constructor( private fireBase: AngularFireDatabase ) { }

  private basePath = '/uploads';

  listClient: AngularFireList<Cliente>;

  returnListClients(){
    return  this.listClient = this.fireBase.list('cliente');
  }
  updateVisitas(keyClient, webClient : Cliente){
    this.listClient.update(keyClient,{
      web:{
        anuncios:webClient.web.anuncios,
        categoria: webClient.web.categoria,
        product: webClient.web.product,
        view: webClient.web.view,
        instagram: webClient.web.instagram,
        facebook: webClient.web.facebook,
        name: webClient.web.name,
        plataforma: webClient.web.plataforma,
        whatsapp: webClient.web.whatsapp,
        carrito: webClient.web.carrito
      }
    });
    return false;
  }


}
