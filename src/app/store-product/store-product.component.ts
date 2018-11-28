import { Component, OnInit, OnChanges } from '@angular/core';
import { Product } from '../interfaces/product';
import { ProductoService } from '../services/producto.service';
import { Cliente } from '../interfaces/cliente';
import { Imgupload } from '../imgupload';
import {MatSnackBar} from '@angular/material';
import { Category } from '../interfaces/category';
import { Router } from '@angular/router';

@Component({
  selector: 'app-store-product',
  templateUrl: './store-product.component.html',
  styleUrls: ['./store-product.component.scss']
})
export class StoreProductComponent implements OnInit {

  StoreProduct : Product;
  Clientes : Cliente[];
  selectedFiles: FileList;
  currentFileUpload: Imgupload;
  progress: { percentage: number, estado?: string } = { percentage: 0, estado: null };
  as: any[];
  hora : string;
  myKey : string;
  productTemp : Product[];
  productTempKEY : string;
  arrayImg : string[];
  listCategory : Category[];
  nameCategory : string;
  tieneEnvio : boolean;
  constructor(
    private ProductService : ProductoService,
    public snackBar: MatSnackBar,
    private router : Router
  )
  { 
    this.StoreProduct = {
      name: "",
      code: "",
      offer: 0,
      price: "",
      description: "",
      stock:0,
      img:["","","",""],
      category:"",
      profundidad: 0,
      ancho: 0,
      alto:0,
      peso: 0
    };
    
  }
 
  ngOnInit() {
    this.nameCategory = "";
    this.productTemp = [];
    this.Clientes = [];
    this.ProductService.getListTempProductsWithSnapchotChange()
    .snapshotChanges()
    .subscribe(item => {
      item.forEach(element => {
        let x = element.payload.toJSON();
        x['$key'] = element.key;
        this.productTemp.push(x as Product);
      });
      this.ProductService.getListClientsWithSnap()
      .snapshotChanges()
      .subscribe(data => {
        data.forEach(element => {
          let x = element.payload.toJSON();
          x['$key'] = element.key;
          this.Clientes.push(x as Cliente);
        });
        this.ProductService.SearchRegistForEmail(localStorage.getItem("cliente-chango"), this.Clientes)
        .subscribe(data => {
          this.myKey = data.$key;
          this.ProductService.SearchKeyByKeyClient(this.myKey, this.productTemp)
          .subscribe(data => {
            if(data === undefined){
              this.StoreProduct.keyClient = this.myKey;
            }else{
              this.productTempKEY = data.$key;
            }
          });
        });
        let boolAux = true;
        this.productTemp.forEach(element => {
            if(element.keyClient === this.myKey ){
              this.StoreProduct = element;
              boolAux = false;
            }
        });
        if(this.StoreProduct.img === undefined){
          this.StoreProduct.img = [""];
        }else{
          this.arrayImg = []; 
          Object.keys(this.StoreProduct.img).forEach(element => {
            this.arrayImg.push(this.StoreProduct.img[element]);
          });
        }
        if(boolAux)
        this.ProductService.insertTempProduct(this.StoreProduct);
      
        this.ProductService.SearchKeyByKeyClient(this.myKey, this.productTemp)
        .subscribe(data => {
          this.productTempKEY = data.$key;
        });
        this.ProductService.returnListCategory(this.myKey)
        .snapshotChanges()
        .subscribe(data => {
          this.listCategory = [];
          data.forEach(element => {
            let z = element.payload.toJSON();
            z["$key"] = element.key;
            this.listCategory.push(z as Category);
          });
        }); 
      });
    });
    
    
    var hoy = new Date();
    var dd = hoy.getDate();
    var mm = hoy.getMonth()+1; //hoy es 0!
    var yyyy = hoy.getFullYear();
    var h = hoy.getHours();
    this.hora = dd + "/" + mm + "/" + yyyy + "-" + h;
  }

  closeImg(url){
    let x;
    this.arrayImg.forEach(element => {
        if(element === url){
          x = this.arrayImg.indexOf(url)
          this.arrayImg.splice(x, 1, "");
          this.StoreProduct.img = this.arrayImg;
          this.ProductService.updateTemp(this.StoreProduct, this.productTempKEY);
        }
    });
  }

  addCategoria(){
    this.ProductService.insertCategory(this.nameCategory);
    this.nameCategory = "";
  }
  openSnackBar(message, action) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

  updateTemp(){
    this.ProductService.SearchKeyByKeyClient(this.myKey, this.productTemp)
    .subscribe(data => {
      this.ProductService.updateTemp(this.StoreProduct, data.$key);
    });
  }

  selectFile(event) {
    let label = document.getElementById("labelFile");
    label.style.background = "grey";
    event.target.disabled = true; 

    this.selectedFiles = event.target.files;
    this.upload(label, event);
  }

  upload(label, input){
    let x = true; 
    let i = 0;
  
    while(x){
      if(this.arrayImg[i] === ""){ 
        x = false;
      }else{
        i++
      }
      if(i>3){
        x = false;
      }
    }

    if (i<=3) {
      const file = this.selectedFiles.item(0);
      if(file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg' ){
        if(file.size < 4000000){
          let aux;
          this.ProductService.SearchKeyByKeyClient(this.myKey, this.productTemp)
          .subscribe(data => {
            aux = data.$key;
          });
          const file = this.selectedFiles.item(0);
          this.selectedFiles = undefined;
          this.currentFileUpload = new Imgupload(file);
          this.currentFileUpload.$key = Math.random();
          this.ProductService.pushFileToStorage(this.currentFileUpload, this.progress, aux, i,false,true,null,label, input);
        }else{
          this.openSnackBar("Debe subir una foto con menor tamaño a 4MB", "Ok!");
        }
      }else{
        this.openSnackBar("Solo se permiten imagenes de formato png y jpg.", "Ok!");
      }
    }else{
      this.openSnackBar("Debe borrar una imagen para poder agregar otra.", "Ok!");
    }
}

  storeProducto(){
    if(this.StoreProduct.category === "0"){
      this.openSnackBar("Por favor eliga una categoría para su producto", "Ok!");
    }else if(this.StoreProduct.description === ""){
      this.openSnackBar("Por favor escriba una descripcion para su producto", "Ok!");      
    }else if(this.StoreProduct.img[0] === ""){
      this.openSnackBar("Por favor seleccione una imagen para su producto", "Ok!");      
    }else if(this.StoreProduct.name === ""){
      this.openSnackBar("Por favor escriba un nombre para su producto", "Ok!");      
    }else if(this.StoreProduct.price === ""){
      this.openSnackBar("Su producto debe tener un precio", "Ok!");            
    }else{
      this.StoreProduct.name = this.StoreProduct.name.replace(/ /g,"-");
      let x = true;
      this.ProductService.returnListProducts(this.myKey)
      this.ProductService.insertProd(this.StoreProduct);
      this.ProductService.deleteTempProduct(this.productTempKEY);    
      this.arrayImg = ["","",""];
      this.router.navigateByUrl("/backend/listado-productos");
    }
  }

  Envio(val : any){
    if(val){
      this.tieneEnvio = val;
    }else{
      this.tieneEnvio = val;
    }
  }

}
