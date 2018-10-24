import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'app/services/producto.service';
import { Cliente } from 'app/interfaces/cliente';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  
  client : Cliente;

  constructor(private clientService : ProductoService) { }

  
  ngOnInit() {
    let aux = localStorage.getItem("cliente-chango");
  
    //  Editamos todos los datos personales del usuario Telefono, instagram y facebook
    this.clientService.getListClientsWithSnap()
    .snapshotChanges()
    .subscribe(data => { 
     let arrayClients = []; 
      data.forEach(element => {
        let x = element.payload.toJSON();
        x["$key"] = element.key;
        if( x["email"] === aux )
        arrayClients.push(x);
      });
      this.client = arrayClients[0];
    });
  }

  updateUser(){
    this.clientService.editClient(this.client);
  }
}
