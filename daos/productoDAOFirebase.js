import { Contenedor } from "../persistence/contenedorFirebase.js";

export class ProductoDAOFirebase extends Contenedor {
    constructor() {
        super("productos");
    }
}