import { Injectable } from '@angular/core';
import { of } from 'rxjs/observable/of';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Product } from '../interfaces/product';
import { Cliente } from '../interfaces/cliente';
import { Observable } from 'rxjs-compat';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import { Imgupload } from '../imgupload';
import { Category } from '../interfaces/category';
import { Anuncio } from '../anuncio';
import { WebTemplate } from 'app/interfaces/web-template';

// objects

@Injectable()
export class ProductoService {
  constructor( private fireBase: AngularFireDatabase ) { }

  private basePath = '/uploads';

  listClient: AngularFireList<Cliente>;
  listCategory: AngularFireList<Category>;
  listNotificacion: AngularFireList<any>;

  products : AngularFireList<Product>;
  tempProducto : AngularFireList<Product>;
  

  url : string;
  
  
  
  getListTempProductsWithSnapchotChange(){
    return this.tempProducto = this.fireBase.list('tempe');
  }


  notificacionList(){
    return this.listNotificacion = this.fireBase.list('notificacion');
  }

  returnListCategory(key){
    return this.listCategory = this.fireBase.list('cliente/'+key+'/web/categoria');
  }

  insertCategory(name){
    this.listCategory.push({
      name: name
    })
  }
  
  deleteCategory(key){
    this.listCategory.remove(key);
  }

  insertTempProduct(Product: Product){
    this.tempProducto.push({
        name: Product.name,
        code: Product.code,
        category: Product.category,
        price: Product.price,
        offer: Product.offer,
        description: Product.description,
        stock: Product.stock,
        img: Product.img,
        keyClient : Product.keyClient
      });
  }

  SearchKeyByKeyClient(keyClient: string, json)  {
    return of(json.find((product => product.keyClient === keyClient)));
  }
  SearchProductByName(name: string, json)  {
    return of(json.find((product => product.name === name)));
  }

  updateTemp( Product : Product, key : string){
    this.tempProducto.update(key,{
      name: Product.name,
      code: Product.code,
      category: Product.category,
      price: Product.price,
      offer: Product.offer,
      description: Product.description,
      stock: Product.stock,
      img: Product.img,
      keyClient : Product.keyClient
    })
  }


  getListClientsWithSnap(){
    return this.listClient = this.fireBase.list('cliente');
  }
  editClient(clientObject : Cliente){
    if(clientObject.web.product === undefined){
      clientObject.web.product = null;
    }
    if(clientObject.web.anuncios === undefined){
      clientObject.web.anuncios = null;
    }
    if(clientObject.web.categoria === undefined){
      clientObject.web.categoria = null;
    }
    if(clientObject.web.carrito === undefined){
      clientObject.web.carrito = null;
    }
    
    this.listClient.update(clientObject.$key, {
      web:{
        product: clientObject.web.product,
        anuncios: clientObject.web.anuncios,
        categoria: clientObject.web.categoria,
        plataforma: clientObject.web.plataforma,
        facebook: clientObject.web.facebook,
        whatsapp: clientObject.web.whatsapp,
        instagram: clientObject.web.instagram,
        view: clientObject.web.view,
        carrito: clientObject.web.carrito
      }
    });
  }

  returnListProducts(keyClient : string){
    return this.products = this.fireBase.list("cliente/"+keyClient+"/web/product");
  }
  returnListProductsOrderByStock(keyClient : string){
    return this.products = this.fireBase.list("cliente/"+keyClient+"/web/product", ref => ref.orderByChild('stock'));
  }

  deleteProduct(key){
    this.products.remove(key);
  }

  deleteTempProduct(key){
    this.tempProducto.remove(key);
  }

  insertProd(storeProduct : Product){
   
    if(storeProduct.alto === undefined){
      storeProduct.alto = 0;
    }
    if(storeProduct.ancho === undefined){
      storeProduct.ancho = 0;
    }
    if(storeProduct.profundidad === undefined){
      storeProduct.profundidad = 0;
    }
    if(storeProduct.peso === undefined){
      storeProduct.peso = 0;
    }

    this.products.push({

      name:storeProduct.name,
      code: storeProduct.code,
      price: storeProduct.price,
      offer: storeProduct.price,
      category: storeProduct.category,
      description: storeProduct.description,
      stock: storeProduct.stock,
      img: storeProduct.img,
      profundidad: storeProduct.profundidad,
      alto:storeProduct.alto,
      ancho:storeProduct.ancho,
      peso:storeProduct.peso
    });
  }



  updateProd(storeProduct : Product, key){
    
    if(storeProduct.alto === undefined){
      storeProduct.alto = 0;
    }
    if(storeProduct.ancho === undefined){
      storeProduct.ancho = 0;
    }
    if(storeProduct.profundidad === undefined){
      storeProduct.profundidad = 0;
    }
    if(storeProduct.peso === undefined){
      storeProduct.peso = 0;
    }

    this.products.update(key, {
      name:storeProduct.name,
      code: storeProduct.code,
      price: storeProduct.price,
      offer: storeProduct.price,
      category: storeProduct.category,
      description: storeProduct.description,
      stock: storeProduct.stock,
      img: storeProduct.img,
      profundidad: storeProduct.profundidad,
      alto:storeProduct.alto,
      ancho:storeProduct.ancho,
      peso:storeProduct.peso
    });
  }
  
  getListClients() {
    
    let auxList : Cliente[];
    auxList = [];
    
    this.listClient = this.fireBase.list('cliente');
    
    this.listClient.snapshotChanges()
    .subscribe(item => {
      item.forEach(element => {
        let x = element.payload.toJSON();
        x['$key'] = element.key;
        auxList.push(x as Cliente);
      });
    });
    return auxList ;
  }

  insertProduct(product, key : string){
    this.listClient.update(key,{
        web : {
          product: product
        } 
    });
  }

  SearchRegistForEmail(email: string, json)  {
    return of(json.find((client => client.email === email)));
  }

  // this methods listed beside are for storing the img of the section

  pushFileToStorage(fileUpload: Imgupload, progress: { percentage: number, estado?: string }, keyTemp : string, posision, bool?, proudctOrAnuncio?, keyAnuncio?, label?, input?) {
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
          this.url = downloadURL;
          
          if(proudctOrAnuncio){
            this.updateTempImg(keyTemp,downloadURL,posision, bool);
          }else{
            this.updateAnuncio(keyTemp, downloadURL, posision, keyAnuncio);
          }
        });
      }
      );
  }
  updateAnuncio(key, url, position, keyAnuncio){
    let arrayAux : Anuncio[];
    let bool = true;
    this.fireBase.list('cliente/'+key+'/web/anuncios')
    .snapshotChanges()
    .subscribe(data => {
      let array = [];
      arrayAux = [];
      
      data.forEach(element => {
          let x = element.payload.toJSON();
          x["$key"] = element.key;
          arrayAux.push(x as Anuncio);
        });
        if(bool){
            arrayAux.forEach(element => {
              Object.keys(element.img).forEach(elemento => {
                array.push(element.img[elemento]);
              });    
              array.splice(position, 1, url);
            }); 
            this.fireBase.list('cliente/'+key+'/web/anuncios').update(keyAnuncio, {
              img: array
            }); 
            bool = false;
        }
    });

   
  }

  updateTempImg(key, url, posision, tempOrProduct?){
    let array = [url];
    let arrayAux : Product[];
    arrayAux = [];
    

    if(tempOrProduct){
      let bool = true;
    this.products.snapshotChanges()
    .subscribe(item => {
      item.forEach(element => {
        let x = element.payload.toJSON();
        x['$key'] = element.key;    
        if( x["$key"] === key)
        arrayAux.push(x as Product);
      });
      if(bool){
        arrayAux.forEach(element => {
          array = [];
          Object.keys(element.img).forEach(elemento => {
              array.push(element.img[elemento]);
          });
          array.splice(posision, 1, url)
        });
        this.products.update(key, {
          img: array
        });
        bool = false;
      }
      });
    }else{
      let bool = true;    
    this.tempProducto.snapshotChanges()
    .subscribe(item => {
      item.forEach(element => {
        let x = element.payload.toJSON();
        x['$key'] = element.key;    
        if( x["$key"] === key)
        arrayAux.push(x as Product);
      });
      if(bool){
      arrayAux.forEach(element => {
          array = [];
          Object.keys(element.img).forEach(elemento => {
              array.push(element.img[elemento]);
          });
          array.splice(posision, 1, url)
      });
        this.tempProducto.update(key, {
          img: array
        });
        bool = false;
      }
      });
    }
  }
  



  private saveFileData(fileUpload: Imgupload) {
    // this.fireBase.list(`${this.basePath}/`).push(fileUpload);
  }
  
  getFileUploads(numberItems): AngularFireList<Imgupload> {
    return this.fireBase.list(this.basePath, ref =>
      ref.limitToLast(numberItems));
  }
  
  
  deleteFileUpload(fileUpload) {
    this.deleteFileDatabase(fileUpload.key)
      .then(() => {
        this.deleteFileStorage(fileUpload.name);
      })
      .catch(error => console.log(error));
  }
  
  private deleteFileDatabase(key: string) {
    return this.fireBase.list(`${this.basePath}/`).remove(key);
  }
  
  private deleteFileStorage(name: string) {
    const storageRef = firebase.storage().ref();
    storageRef.child(`${this.basePath}/${name}`).delete();
  }
}


  