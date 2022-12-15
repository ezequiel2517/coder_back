import { Contenedor } from "../persistence/contenedorFirebase";

export class ProductoDAOFirebase extends Contenedor {
    constructor() {
        super("productos");
    }
}