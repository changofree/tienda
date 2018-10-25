import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-validacion',
  templateUrl: './validacion.component.html',
  styleUrls: ['./validacion.component.scss']
})
export class ValidacionComponent implements OnInit {

  Email : string;
  Contrasena : string;
  
  constructor() { }

  ngOnInit() {
  }

}
