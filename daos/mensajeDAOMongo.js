import { Contenedor } from "../persistence/contenedorMongo.js";

export class ProductoDAOMongo extends Contenedor {
    constructor() {
        super("../persistence/schemas/mensaje.js");
    }
}