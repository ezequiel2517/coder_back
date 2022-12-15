import mongoose from "mongoose";
import { productoModel } from "./schemas/producto.js"

class Contenedor {
    async save(item, model) {
        await mongoose.connect('mongodb+srv://ezequiel:UmEytzlQ2lRe94Fu@cluster0.v5hpbf0.mongodb.net/ecommerce?retryWrites=true&w=majority');
        const itemSave = model(item);
        model.save(itemSave);
    }
}

const contenedor = new Contenedor(productoModel);
contenedor.save(
    {
        "nombre": "Soy un nombre.",
        "descripcion": "Soy una descripcion.",
        "codigo": "Soy un codigo.",
        "foto": "Soy una url.",
        "precio": 122,
        "stock": 12,
        "timestamp": 1668992573041
    },
    productoModel
)



