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
  updateColor(color,web : WebTemplate, key){
    if(web.carrito === undefined){
      web.carrito = null;
    }
    if(web.categoria === undefined){
      web.categoria = null;
    }
    if(web.product === undefined){
      web.product = null;
    }
    if(web.name === undefined){
     web.name = null;
    }
    if(web.anuncios === undefined){
      web.anuncios = null;
    }
    if(web.facebook === undefined){
      web.facebook = null;
    }
    this.listClient.update(key,{
      web:{
        view:web.view,
        facebook:web.facebook,
        product: web.product,
        name: web.name,
        anuncios: web.anuncios,
        categoria: web.categoria,
        plataforma:web.plataforma,
        carrito:web.carrito,
        whatsapp: web.whatsapp,
        instagram:web.instagram,
        color:color 
      }
    })
  }
  updateVisitas(keyClient, webClient : Cliente){
   if(webClient.web.carrito === undefined){
     webClient.web.carrito = null;
   }
   if(webClient.web.categoria === undefined){
     webClient.web.categoria = null;
   }
   if(webClient.web.product === undefined){
     webClient.web.product = null;
   }
   if(webClient.web.name === undefined){
     webClient.web.name = null;
   }
   if(webClient.web.anuncios === undefined){
     webClient.web.anuncios = null;
   }
   if(webClient.web.color === undefined){
     webClient.web.color = null;
   }

    this.listClient.update(keyClient,{
      web:{
        color:webClient.web.color,
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
  }


}
