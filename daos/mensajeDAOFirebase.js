import { Contenedor } from "../persistence/contenedorFirebase";

export class MensajeDAOFirebase extends Contenedor {
    constructor() {
        super("mensajes");
    }
}