import { WebTemplate } from "./web-template";

export interface Cliente {
    $key?:string;
    name?:string;
    email?:string;
    hasta?:string;
    password?:string;
    marca?:string;
    web?:  WebTemplate;    
    fecha?:string;
    pedido?:any;
    mercadopago?:any;
}