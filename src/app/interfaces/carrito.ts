export interface Carrito {
    $key?:string;
    keyfb?:string;
    numeroPedido?:number;
    nombreProducto?: string;
    imagenProducto?:string;
    cantidad?:number;
    precioUnitario?:number;
    peso?: number,
    alto?: number,
    ancho?: number,
    profundidad?: number
}
