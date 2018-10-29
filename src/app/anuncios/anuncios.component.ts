import { Component, OnInit } from '@angular/core';
import { AnunciosService } from '../anuncios.service';
import { ProductoService } from '../services/producto.service';
import { Anuncio } from '../anuncio';
import { Cliente } from '../interfaces/cliente';
import { Imgupload } from '../imgupload';
import { MatSnackBar } from '@angular/material';



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

  constructor(private anuncioService : AnunciosService, private ProductService : ProductoService, public snackBar : MatSnackBar) { }

  ngOnInit() {
    
    //  Agarramos el email guardado en localstorage.
    const email = localStorage.getItem("cliente-chango");
    this.arrayImg = [];           
    
    
    this.anuncioService.returnListCliente()
    .snapshotChanges()
    .subscribe(data => {
      
      let boolAux = true; 
      //  Inicializamos las variables
      this.clients = [];
      let aux : Cliente[];
      aux = [];

      //  Generamos el listado de clientes filtrando por el mail obtenido con localStorage.
      data.forEach(element => {
        let x = element.payload.toJSON();
        x["$key"] = element.key;
        if(x["email"] === email){
          this.clients.push(x as Cliente);
          aux.push(x as Cliente);
        }
      });

      /*  
      * Aux[0] es el cliente que esta logeado. Aux[0].$key es su respectiva key.  
      * Aux se define en el ForEach de arriba.
      */
      // if(boolAux){
 
      this.anuncioService.returnListAnuncios(aux[0].$key)
      .snapshotChanges()
      .subscribe(data => {
        this.anuncio = [];
        data.forEach(element => {
          let y = element.payload.toJSON();
          y["$key"] = element.key;
          this.anuncio.push(y as Anuncio);
        });
        if(this.anuncio.length === 0){          //  Si no existe ningun anuncio configurado generamos 3 espacios null en firebase.
          this.anuncioService.initialAnuncio();
        }
        
          this.arrayImg = [];
          Object.keys(this.anuncio[0].img).forEach(element => {     //Usar forEach dentro de un objecto, todas las urls guardadas en firebase se guanda en el arrayImg.
            this.arrayImg.push(this.anuncio[0].img[element]);
          });
        
      });
 
      // boolAux = false;
      // } 
    }); // Fin de subscribe general.
  }


  /**
   * Seleccionamos el archivo tomado en el input type file
   * @param event Variable tomada con el evento (change) en html
   */
  selectFile(event) {
    this.selectedFiles = event.target.files;
    this.upload();
  }

  //  Funcion generica para abrir errores y/o advertencias.
  openSnackBar(message, action) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

  // Generamos una mini validacion de cada archivo seleccionado en selectFile(). Y lo subimos si esta todo OK.
  upload(){
    let x = true;  // Lo usamos para tomar la posicon del espacio vacio o para terminar el While.
    let i = 0;     // Posicion del arrayImg.
  
    while(x){
      if(this.arrayImg[i] === ""){  // Si alguna posicion del array tiene una imagen vacia se guarda esa posicion en la variable i para luego remplazar el espacio vacio por una img.
        x = false;
      }else{
        i++
      }
      if(i>3){
        x = false;  // Si hay 3 images
      }
    }

    if (i<=2) { //  Si hay menos de 3 imagenes ya subidas.
      let aux;     
      if(this.selectedFiles.item(0).type === 'image/png' || this.selectedFiles.item(0).type === 'image/jpeg' || this.selectedFiles.item(0).type === 'image/jpg' ){  //Validacion de tipos.
        if(this.selectedFiles.item(0).size < 4000000){          // Si el archivo seleccionado pesa menos de 4mb.
          this.ProductService.SearchRegistForEmail(localStorage.getItem("cliente-chango"), this.clients )
          .subscribe(data => {
            aux = data.$key;
            const file = this.selectedFiles.item(0);
            this.selectedFiles = undefined;
            this.currentFileUpload = new Imgupload(file);
            this.currentFileUpload.$key = Math.random();
            this.ProductService.pushFileToStorage(this.currentFileUpload, this.progress, aux, i,false, false, this.anuncio[0].$key);  //Subimos la imagen.
          });
        }else{
          this.openSnackBar("La imagen seleccionada pesa más de 4MB, por favor editala.","ok!");
        }
      }else{
        this.openSnackBar("Solo se aceptan formatos png y jpg.","ok!");
      }
    }else{
      this.openSnackBar("Debe borrar la foto que desea cambiar","ok!");
    }
}

  /**
   * Borramos la imagen seleccionada en html.
   * @param url Tomada por el evento (click)
   */
  closeImg(url){
    let x = 0;
    this.arrayImg.forEach(element => {
        if(element === url){
          x = this.arrayImg.indexOf(url)
        }
      });
      this.arrayImg.splice(x, 1, "");
      this.anuncioService.updateImg(this.arrayImg, this.anuncio[0].$key);
  }


}
