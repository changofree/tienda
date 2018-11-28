import { Component, OnInit } from '@angular/core';
import { Imgupload } from 'app/imgupload';
import { WebTemplate } from 'app/interfaces/web-template';
import { DashboardService } from 'app/dashboard.service';

@Component({
  selector: 'app-anuncio',
  templateUrl: './anuncio.component.html',
  styleUrls: ['./anuncio.component.scss']
})
export class AnuncioComponent implements OnInit {
  
  oferta : string;
  selectedFiles: FileList;
  currentFileUpload: Imgupload;
  progress: { percentage: number, estado?: string } = { percentage: 0, estado: null };
  key : string;
  web : WebTemplate;

  constructor(
    private dashboardService : DashboardService
  ) { }

  ngOnInit() {
    let email = localStorage.getItem("cliente-chango");
    
    this.dashboardService.returnListClients()
    .snapshotChanges()
    .subscribe(data => {
      let aux = [];
      this.oferta = "";
      data.forEach(element => {
        let x = element.payload.toJSON();
        x["$key"] = element.key;
        if(email === x["email"]){
          this.web = x["web"];
          this.key = x["$key"];
          if(x["web"]["oferta"] !== undefined){
            this.oferta = x["web"]["oferta"];
          }
        }
      });
    })
  }
  selectFile(event) {
    let label = document.getElementById("labelFile-t");
    label.style.background = "grey";
    event.target.disabled = true; 

    this.selectedFiles = event.target.files;
    this.upload(label, event);
  }

  upload(label, input){
      const file = this.selectedFiles.item(0);
      if(file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg' ){
        if(file.size < 4000000){
          let aux;
          
          const file = this.selectedFiles.item(0);
          this.selectedFiles = undefined;
          this.currentFileUpload = new Imgupload(file);
          this.currentFileUpload.$key = Math.random();
          this.dashboardService.pushFileToStorageOferta(this.currentFileUpload, this.progress, this.key, label, input, this.web);
        }else{
        }
      }else{
      }
    }
}
