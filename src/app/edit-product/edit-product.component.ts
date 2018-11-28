import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../services/producto.service';
import { Cliente } from '../interfaces/cliente';
import { Product } from '../interfaces/product';
import { Router, ActivatedRoute } from '@angular/router';
import { Imgupload } from '../imgupload';
import { Category } from '../interfaces/category';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {


  Clientes : Cliente[];
  ProductToEdit : Product;
  myKey : string;
  hora : string; 
  arrayImg : string[];
  selectedFiles: FileList;
  currentFileUpload: Imgupload;
  progress: { percentage: number } = { percentage: 0 };
  listFilter : string[];
  listCategory : Category[];
  nameCategory: string;
  tieneEnvio;
  
  constructor(
    private ProductService : ProductoService,
    private _activatedRoute: ActivatedRoute,
    public snackBar : MatSnackBar
  ){}

  ngOnInit() {
    this.nameCategory = "";
    this.Clientes = [];
    let first = true;
      this.ProductService.getListClientsWithSnap()
      .snapshotChanges()
      .subscribe(data => {
        data.forEach(element => {
          let x = element.payload.toJSON();
          x['$key'] = element.key;
          this.Clientes.push(x as Cliente);
        });
        
        //  Filtramos los cientes por el cliente actual.
        this.ProductService.SearchRegistForEmail(localStorage.getItem("cliente-chango"), this.Clientes)
        .subscribe(data => {
          this.myKey = data.$key;
        });

        //  Generamos el listado de productos.
        this.ProductService.returnListProducts(this.myKey)
        .snapshotChanges()
        .subscribe(data => {
          const key = this._activatedRoute.snapshot.paramMap.get('key');  //key del producto 
          data.forEach(element => {
            let x = element.payload.toJSON();
            x["$key"] = element.key;
            if(x["$key"] === key){
              this.ProductToEdit = x; //  Guardamos el producto que vamos a editar en ProductToEdit;
              console.log(this.ProductToEdit.price);
            }
          });
          if(first)
          this.arrayImg = []; //Si existen imagenes, se guardan en este array. 
          Object.keys(this.ProductToEdit.img).forEach(element => {
            this.arrayImg.push(this.ProductToEdit.img[element]);
          }); 
        });

        //  Gurdar el listado de todas las categorias pertenecientes a este cliente.
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
  }

  updateTemp(){
    this.ProductToEdit.name = this.ProductToEdit.name.replace(/ /g,"-");
    this.ProductService.updateProd(this.ProductToEdit, this.ProductToEdit.$key);
  }
  /**
   * Tomamos el archivo seleccionado por el usuario
   * @param event Valor tomado por evento (change)
   */
  selectFile(event) {
    let label = document.getElementById("labelFile");
    label.style.background = "grey";
    event.target.disabled = true; 

    this.selectedFiles = event.target.files;
    this.upload(label, event);
  }

  // Validamos el archivo seleccionado por el usuario en selectFile y lo subimos si todo esta ok.
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
        this.selectedFiles = undefined;
        this.currentFileUpload = new Imgupload(file);
        this.currentFileUpload.$key = Math.random();
        this.ProductService.pushFileToStorage(this.currentFileUpload, this.progress,this.ProductToEdit.$key , i, true,true,null,label, input);  
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

  openSnackBar(message, action) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }
  addCategoria(){
    this.ProductService.insertCategory(this.nameCategory);
    this.nameCategory = "";
  }
  //  Borramos la imagen seleccionada.
  closeImg(url){
    let x = 0;
    this.arrayImg.forEach(element => {
   
       if(element === url){
          x = this.arrayImg.indexOf(url)
        }
      });

      this.arrayImg.splice(x, 1, "");
      this.ProductToEdit.img = this.arrayImg;
      this.ProductService.updateProd(this.ProductToEdit, this.ProductToEdit.$key);
    }

    Envio(val : any){
      if(val){
        this.tieneEnvio = val;
      }else{
        this.tieneEnvio = val;
      }
    }
}
