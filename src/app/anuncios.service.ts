import { Injectable } from '@angular/core';
import { of } from 'rxjs/observable/of';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs-compat';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import { Imgupload } from './imgupload';
import { Anuncio } from './anuncio';
import { Cliente } from './interfaces/cliente';

@Injectable()
export class AnunciosService {

  private basePath = '/uploads';

  listClient: AngularFireList<Cliente>;
  listAnuncios : AngularFireList<Anuncio>;

  constructor( private fireBase: AngularFireDatabase ) { }

  returnListCliente(){
    return this.listClient = this.fireBase.list('cliente');
  }

  returnListAnuncios(key){
    return this.listAnuncios = this.fireBase.list('cliente/'+key+'/web/anuncios');
  }

  initialAnuncio(){
    this.listAnuncios.push({
      img: ["","",""]
    });
  }
  updateImg(arrayImg, key){
    this.listAnuncios.update(key, {
      img: arrayImg
    });
  }

}
