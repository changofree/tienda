import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../services/producto.service';
import { Cliente } from '../interfaces/cliente';
import { Product } from '../interfaces/product';
import { Router, ActivatedRoute } from '@angular/router';
import { Imgupload } from '../imgupload';
import { Category } from '../interfaces/category';

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
  as: any[];
  listFilter : string[];
  listCategory : Category[];

  constructor(private ProductService : ProductoService, private router: Router, private _activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.Clientes = [];
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
        });
        this.ProductService.returnListProducts(this.myKey)
        .snapshotChanges()
        .subscribe(data => {
          const key = this._activatedRoute.snapshot.paramMap.get('key');     
          data.forEach(element => {
            let x = element.payload.toJSON();
            x["$key"] = element.key;
            if(x["$key"] === key){
              this.ProductToEdit = x;
            }
          });
          this.arrayImg = []; 
          Object.keys(this.ProductToEdit.img).forEach(element => {
            this.arrayImg.push(this.ProductToEdit.img[element]);
          }); 
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
      


    var hoy = new Date();
    var dd = hoy.getDate();
    var mm = hoy.getMonth()+1; //hoy es 0!
    var yyyy = hoy.getFullYear();
    var h = hoy.getHours();
    this.hora = dd + "/" + mm + "/" + yyyy + "-" + h;
  }

  updateTemp(){
    this.ProductService.updateProd(this.ProductToEdit, this.ProductToEdit.$key);
  }

  
  applyFilter(filterValue: string) {
    this.listFilter = [];
    // this..forEach(element => {
      // if (element.name.toUpperCase().match(filterValue.toUpperCase())){
      //   this.listFilter.push(element.name);
      // }
    // });
  }


  selectFile(event) {
    this.selectedFiles = event.target.files;
    this.upload();
  }

  upload(){
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
        this.ProductService.pushFileToStorage(this.currentFileUpload, this.progress,this.ProductToEdit.$key , i, true,true);  
        }else{

        }
      }else{

      }
    }else{
      // this.snackBar.open("Debe borrar una imagen para poder agregar otra.", "Ok!");
    }
  }


  closeImg(url){
    let x;
    this.arrayImg.forEach(element => {
        if(element === url){
          x = this.arrayImg.indexOf(url)
          this.arrayImg.splice(x, 1, "");
          this.ProductToEdit.img = this.arrayImg;
          this.ProductService.updateProd(this.ProductToEdit, this.ProductToEdit.$key);
        }
    });
  }

}
