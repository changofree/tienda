import { Component, OnInit } from '@angular/core';
import { AnunciosService } from '../anuncios.service';
import { ProductoService } from '../services/producto.service';
import { Anuncio } from '../anuncio';
import { Cliente } from '../interfaces/cliente';
import { Imgupload } from '../imgupload';



@Component({
  selector: 'app-anuncios',
  templateUrl: './anuncios.component.html',
  styleUrls: ['./anuncios.component.scss']
})
export class AnunciosComponent implements OnInit {

  arrayImg : string[];
  anuncio : Anuncio[];
  clients : Cliente[];
  selectedFiles: FileList;
  currentFileUpload: Imgupload;
  progress: { percentage: number } = { percentage: 0 };
  as: any[];

  constructor(private anuncioService : AnunciosService, private ProductService : ProductoService) { }

  ngOnInit() {
    localStorage.setItem("chango-cliente", "toto");

    const email = localStorage.getItem("chango-cliente");
    console.log(email);
    this.arrayImg;    
    this.anuncioService.returnListCliente()
    .snapshotChanges()
    .subscribe(data => {
      this.clients = [];
      let aux : Cliente[];
      aux = [];
      data.forEach(element => {
        let x = element.payload.toJSON();
        x["$key"] = element.key;
        if(x["email"] === email)
        this.clients.push(x as Cliente);
        aux.push(x as Cliente);
      });
      this.anuncioService.returnListAnuncios(aux[0].$key)
      .snapshotChanges()
      .subscribe(data => {
        this.anuncio = [];
        data.forEach(element => {
          let y = element.payload.toJSON();
          y["$key"] = element.key;
          this.anuncio.push(y as Anuncio);
        });
console.log(this.anuncio)
        if(this.anuncio.length === 0){
          this.anuncioService.initialAnuncio();
        }else{
          this.arrayImg = [];
          Object.keys(this.anuncio[0].img).forEach(element => {
            this.arrayImg.push(this.anuncio[0].img[element]);
          });
        }
      }); 
    });
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

    if (i<=2) {
      let aux;
      // this.ProductService.SearchKeyByKeyClient(this.myKey, this.productTemp)
      // .subscribe(data => {
      //   aux = data.$key;
      // });
      this.ProductService.SearchRegistForEmail(localStorage.getItem("chango-cliente"), this.clients )
      .subscribe(data => {
        console.log(data)
        aux = data.$key;
      });

      const file = this.selectedFiles.item(0);
      this.selectedFiles = undefined;
      this.currentFileUpload = new Imgupload(file);
      this.currentFileUpload.$key = Math.random();
      this.ProductService.pushFileToStorage(this.currentFileUpload, this.progress, aux, i,false, false, this.anuncio[0].$key);
    }else{
      console.log("Debe borrar una imagen para poder agregar otra.", "Ok!");
    }
}

  closeImg(url){
    let x;
    this.arrayImg.forEach(element => {
        if(element === url){
          x = this.arrayImg.indexOf(url)
          this.arrayImg.splice(x, 1, "");
          this.anuncioService.updateImg(this.arrayImg, this.anuncio[0].$key);
        }
    });
  }


}
