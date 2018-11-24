import { Product } from './product'
import { Category } from './category';
import { Carrito } from './carrito';

export interface WebTemplate {
    $key?: string;
    product?: any[];
    name?:string;
    anuncios?:any;
    categoria?: Category;
    plataforma?:string;
    whatsapp?:string;
    instagram?:string;
    facebook?:string;
    view?:number;
    carrito?: Carrito;
    color?:string;
}
