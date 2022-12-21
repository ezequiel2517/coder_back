import { Contenedor } from "../persistence/contenedorFirebase.js";

export class CarritoDAOFirebase extends Contenedor {
    constructor() {
        super("carritos");
    }
}