import { Injectable } from '@angular/core';
import { of } from 'rxjs/observable/of';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Product } from './interfaces/product';
import { Cliente } from './interfaces/cliente';
import { Observable } from 'rxjs-compat';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import { WebTemplate } from './interfaces/web-template';
import { Imgupload } from './imgupload';

@Injectable()
export class DashboardService {

  constructor( private fireBase: AngularFireDatabase ) { }

  private basePath = '/uploads';

  listClient: AngularFireList<Cliente>;

  returnListClients(){
    return  this.listClient = this.fireBase.list('cliente');
  }

  returnListClientWeb(key){
    return  this.listClient = this.fireBase.list('cliente/'+key+'/web');
  }

  updateInformacion(informacion, web, key){
    if(web.carrito === undefined){
      web.carrito = null;
    }
    if(web.view === undefined){
      web.view = null;
    }
    if(web.instagram === undefined){
      web.instagram = null;
    }
    if(web.whatsapp === undefined){
      web.whatsapp = null;
    }
    if(web.plataforma === undefined){
      web.plataforma = null;
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
    if(web.colorFuente === undefined){
      web.colorFuente = null;
    }
    if(web.logo === undefined){
      web.logo = null;
    }
    if(web.color === undefined){
      web.color = null;
    }
    if(web.banner === undefined){
      web.banner = null;
    }
    if(web.google === undefined){
      web.google = null;
    }
    if(web.pixel === undefined){
      web.pixel = null;
    }
    if(web.oferta === undefined){
      web.oferta = null;
    }
    this.listClient.update(key,{
      web:{
        banner:web.banner,
        view:web.view,
        facebook:web.facebook,
        product: web.product,
        name: web.name,
        logo: web.logo,
        anuncios: web.anuncios,
        categoria: web.categoria,
        plataforma:web.plataforma,
        carrito:web.carrito,
        whatsapp: web.whatsapp,
        instagram:web.instagram,
        color:web.color,
        colorFuente:web.colorFuente,
        informacion:informacion,
        pixel:web.pixel,
        google:web.google,
        oferta:web.oferta 
      }
    })
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
    if(web.colorFuente === undefined){
      web.colorFuente = null;
    }
    if(web.logo === undefined){
      web.logo = null;
    }
    if(web.color === undefined){
      web.color = null;
    }
    if(web.oferta === undefined){
      web.oferta = null;
    }
    if(web.banner === undefined){
      web.banner = null;
    }
    this.listClient.update(key,{
      web:{
        banner:web.banner,
        view:web.view,
        facebook:web.facebook,
        product: web.product,
        name: web.name,
        logo: web.logo,
        anuncios: web.anuncios,
        categoria: web.categoria,
        plataforma:web.plataforma,
        carrito:web.carrito,
        whatsapp: web.whatsapp,
        instagram:web.instagram,
        color:color,
        colorFuente:web.colorFuente,
        informacion: web.informacion,
        oferta: web.oferta 
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
   if(webClient.web.colorFuente === undefined){
    webClient.web.colorFuente = null;
   }
   if(webClient.web.logo === undefined){
    webClient.web.logo = null;
   }
   if(webClient.web.informacion === undefined){
    webClient.web.informacion = null;
   }

   if(webClient.web.banner === undefined){
    webClient.web.banner = null;
   }
   if(webClient.web.google === undefined){
     webClient.web.google = null;
   }

   if(webClient.web.pixel === undefined){
    webClient.web.pixel = null;
  }
  if(webClient.web.oferta === undefined){
    webClient.web.oferta = null;
  }
    this.listClient.update(keyClient,{
      web:{
        banner:webClient.web.banner,
        color:webClient.web.color,
        colorFuente:webClient.web.colorFuente,
        anuncios:webClient.web.anuncios,
        categoria: webClient.web.categoria,
        product: webClient.web.product,
        logo:webClient.web.logo,
        view: webClient.web.view,
        instagram: webClient.web.instagram,
        facebook: webClient.web.facebook,
        name: webClient.web.name,
        plataforma: webClient.web.plataforma,
        whatsapp: webClient.web.whatsapp,
        carrito: webClient.web.carrito,
        informacion: webClient.web.informacion,
        pixel:webClient.web.pixel,
        google:webClient.web.google,
        oferta:webClient.web.oferta
      }
    });
  }

  updateColorFuente(colorFuente, web : WebTemplate, key){
    if(web.carrito === undefined){
      web.carrito = null;
    }
    if(web.view === undefined){
      web.view = null;
    }
    if(web.instagram === undefined){
      web.instagram = null;
    }
    if(web.whatsapp === undefined){
      web.whatsapp = null;
    }
    if(web.plataforma === undefined){
      web.plataforma = null;
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
    if(web.colorFuente === undefined){
      web.colorFuente = null;
    }
    if(web.logo === undefined){
      web.logo = null;
    }
    if(web.color === undefined){
      web.color = null;
    }
    if(web.banner === undefined){
      web.banner = null;
    }
    if(web.google === undefined){
      web.google = null;
    }
    if(web.pixel === undefined){
      web.pixel = null;
    }
    if(web.oferta === undefined){
      web.oferta = null;
    }
    this.listClient.update(key,{
      web:{
        banner: web.banner,
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
        logo:web.logo,
        color:web.color,
        colorFuente:colorFuente, 
        informacion:web.informacion,
        google:web.google,
        pixel:web.pixel,
        oferta:web.oferta
      }
    })
  }


  pushFileToStorage(fileUpload: Imgupload, progress: { percentage: number, estado?: string }, keyTemp : string, label?, input?,web?, isBanner?) {
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`${this.basePath}/${fileUpload.$key}`).put(fileUpload.file);
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        // in progress
        const snap = snapshot as firebase.storage.UploadTaskSnapshot;
        progress.percentage = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);
        if(progress.percentage === 100){
          progress.estado = "Carga completa";
          label.style.background = "transparent";
          input.target.disabled = false;
        }else{
          progress.estado = null;
        }
      },
      (error) => {
        // fail
        console.log(error);
      },
      () => {
        // success
        uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
          fileUpload.url = downloadURL;
          fileUpload.name = fileUpload.file.name;
          if(isBanner){
            this.updateBanner(keyTemp,downloadURL, web);
          }else{
            this.updateLogo(keyTemp,downloadURL, web);
          }
        });
      }
      );
  }

  updateBanner(key, url, web){
    if(web.carrito === undefined){
      web.carrito = null;
    }
    if(web.view === undefined){
      web.view = null;
    }
    if(web.instagram === undefined){
      web.instagram = null;
    }
    if(web.whatsapp === undefined){
      web.whatsapp = null;
    }
    if(web.plataforma === undefined){
      web.plataforma = null;
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
    if(web.colorFuente === undefined){
      web.colorFuente = null;
    }
    if(web.logo === undefined){
      web.logo = null;
    }
    if(web.color === undefined){
      web.color = null;
    }
    if(web.banner === undefined){
      web.banner = null;
    }
    if(web.google === undefined){
      web.google = null;
    }
    if(web.pixel === undefined){
      web.pixel = null;
    }
    if(web.oferta === undefined){
      web.oferta = null;
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
        logo:web.logo,
        color:web.color,
        informacion:web.informacion,
        colorFuente:web.colorFuente,
        banner: url,
        pixel:web.pixel,
        google:web.google,
        oferta:web.oferta
      }
    })
  }

  updateLogo(key, url, web){
    if(web.carrito === undefined){
      web.carrito = null;
    }
    if(web.view === undefined){
      web.view = null;
    }
    if(web.instagram === undefined){
      web.instagram = null;
    }
    if(web.whatsapp === undefined){
      web.whatsapp = null;
    }
    if(web.plataforma === undefined){
      web.plataforma = null;
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
    if(web.colorFuente === undefined){
      web.colorFuente = null;
    }
    if(web.logo === undefined){
      web.logo = null;
    }
    if(web.color === undefined){
      web.color = null;
    }
    if(web.banner === undefined){
      web.banner = null;
    }
    if(web.google === undefined){
      web.google = null;
    }
    if(web.pixel === undefined){
      web.pixel = null;
    }
    if(web.oferta === undefined){
      web.oferta = null;
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
        logo:url,
        color:web.color,
        informacion:web.informacion,
        colorFuente:web.colorFuente,
        google:web.google,
        pixel:web.pixel,
        banner:web.banner,
        oferta:web.oferta
      }
    })
  }


  updatePixel(pixel, web : WebTemplate, key){
    if(web.carrito === undefined){
      web.carrito = null;
    }
    if(web.view === undefined){
      web.view = null;
    }
    if(web.instagram === undefined){
      web.instagram = null;
    }
    if(web.whatsapp === undefined){
      web.whatsapp = null;
    }
    if(web.plataforma === undefined){
      web.plataforma = null;
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
    if(web.colorFuente === undefined){
      web.colorFuente = null;
    }
    if(web.logo === undefined){
      web.logo = null;
    }
    if(web.color === undefined){
      web.color = null;
    }
    if(web.banner === undefined){
      web.banner = null;
    }
    if(web.google === undefined){
      web.google = null;
    }
    if(web.pixel === undefined){
      web.pixel = null;
    }
    if(web.oferta === undefined){
      web.oferta = null;
    }
    this.listClient.update(key,{
      web:{
        banner:web.banner,
        view:web.view,
        facebook:web.facebook,
        product: web.product,
        name: web.name,
        logo: web.logo,
        anuncios: web.anuncios,
        categoria: web.categoria,
        plataforma:web.plataforma,
        carrito:web.carrito,
        whatsapp: web.whatsapp,
        instagram:web.instagram,
        color:web.color,
        colorFuente:web.colorFuente,
        informacion: web.informacion, 
        google:web.google,
        pixel: pixel,
        oferta:web.oferta
      }
    })
  }

  updateGoogle(google, web, key){
    if(web.carrito === undefined){
      web.carrito = null;
    }
    if(web.view === undefined){
      web.view = null;
    }
    if(web.instagram === undefined){
      web.instagram = null;
    }
    if(web.whatsapp === undefined){
      web.whatsapp = null;
    }
    if(web.plataforma === undefined){
      web.plataforma = null;
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
    if(web.colorFuente === undefined){
      web.colorFuente = null;
    }
    if(web.logo === undefined){
      web.logo = null;
    }
    if(web.color === undefined){
      web.color = null;
    }
    if(web.banner === undefined){
      web.banner = null;
    }
    if(web.google === undefined){
      web.google = null;
    }
    if(web.pixel === undefined){
      web.pixel = null;
    }
    if(web.oferta === undefined){
      web.oferta = null;
    }
    this.listClient.update(key,{
      web:{
        banner:web.banner,
        view:web.view,
        facebook:web.facebook,
        product: web.product,
        name: web.name,
        logo: web.logo,
        anuncios: web.anuncios,
        categoria: web.categoria,
        plataforma:web.plataforma,
        carrito:web.carrito,
        whatsapp: web.whatsapp,
        instagram:web.instagram,
        color:web.color,
        colorFuente:web.colorFuente,
        informacion: web.informacion, 
        google:google,
        pixel: web.pixel,
        oferta:web.oferta
      }
    })
  }






  pushFileToStorageOferta(fileUpload: Imgupload, progress: { percentage: number, estado?: string }, keyTemp : string, label?, input?,web?) {
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`${this.basePath}/${fileUpload.$key}`).put(fileUpload.file);
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        // in progress
        const snap = snapshot as firebase.storage.UploadTaskSnapshot;
        progress.percentage = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);
        if(progress.percentage === 100){
          progress.estado = "Carga completa";
          label.style.background = "transparent";
          input.target.disabled = false;
        }else{
          progress.estado = null;
        }
      },
      (error) => {
        // fail
        console.log(error);
      },
      () => {
        // success
        uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
          fileUpload.url = downloadURL;
          fileUpload.name = fileUpload.file.name;
            this.updateOferta(keyTemp,downloadURL, web);
        });
      }
      );
  }

  updateOferta(key, oferta, web){
    console.log(oferta);  
    if(web.carrito === undefined){
      web.carrito = null;
    }
    if(web.view === undefined){
      web.view = null;
    }
    if(web.instagram === undefined){
      web.instagram = null;
    }
    if(web.whatsapp === undefined){
      web.whatsapp = null;
    }
    if(web.plataforma === undefined){
      web.plataforma = null;
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
    if(web.colorFuente === undefined){
      web.colorFuente = null;
    }
    if(web.logo === undefined){
      web.logo = null;
    }
    if(web.color === undefined){
      web.color = null;
    }
    if(web.banner === undefined){
      web.banner = null;
    }
    if(web.google === undefined){
      web.google = null;
    }
    if(web.pixel === undefined){
      web.pixel = null;
    }
    this.listClient.update(key,{
      web:{
        banner:web.banner,
        view:web.view,
        facebook:web.facebook,
        product: web.product,
        name: web.name,
        logo: web.logo,
        anuncios: web.anuncios,
        categoria: web.categoria,
        plataforma:web.plataforma,
        carrito:web.carrito,
        whatsapp: web.whatsapp,
        instagram:web.instagram,
        color:web.color,
        colorFuente:web.colorFuente,
        informacion: web.informacion, 
        google:web.google,
        pixel: web.pixel,
        oferta:oferta
      }
    })
  }
}

