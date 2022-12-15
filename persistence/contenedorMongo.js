import mongoose from "mongoose";

export class Contenedor {
    constructor(model) {
        this.model = model;
    }

    async save(item) {
        try {
            const { model } = await import(this.model);
            await mongoose.connect('mongodb+srv://ezequiel:UmEytzlQ2lRe94Fu@cluster0.v5hpbf0.mongodb.net/ecommerce?retryWrites=true&w=majority');
            const itemSave = new model(item);
            itemSave.save(itemSave);
        }
        catch (error) {
            console.log(error);
        }
    }

    async getAll() {
        try {
            const { model } = await import(this.model);
            await mongoose.connect('mongodb+srv://ezequiel:UmEytzlQ2lRe94Fu@cluster0.v5hpbf0.mongodb.net/ecommerce?retryWrites=true&w=majority');
            return await model.find({});
        } catch (error) {
            console.log(error);
        }
    }

    async getById(id) {
        try {
            const { model } = await import(this.model);
            await mongoose.connect('mongodb+srv://ezequiel:UmEytzlQ2lRe94Fu@cluster0.v5hpbf0.mongodb.net/ecommerce?retryWrites=true&w=majority');
            return await model.findById(id);
        } catch (error) {
            console.log(error);
        }
    }

    async deleteById(id) {
        try {
            const { model } = await import(this.model);
            await mongoose.connect('mongodb+srv://ezequiel:UmEytzlQ2lRe94Fu@cluster0.v5hpbf0.mongodb.net/ecommerce?retryWrites=true&w=majority');
            await model.findByIdAndDelete(id);
        } catch (error) {
            console.log(error);
        }
    }

    async deleteAll() {
        try {
            const { model } = await import(this.model);
            await mongoose.connect('mongodb+srv://ezequiel:UmEytzlQ2lRe94Fu@cluster0.v5hpbf0.mongodb.net/ecommerce?retryWrites=true&w=majority');
            await model.deleteMany({});
        } catch (error) {
            console.log(error);
        }
    }

    async modify(item) {
        try {
            const { model } = await import(this.model);
            await mongoose.connect('mongodb+srv://ezequiel:UmEytzlQ2lRe94Fu@cluster0.v5hpbf0.mongodb.net/ecommerce?retryWrites=true&w=majority');
            await model.findByIdAndUpdate(item.id, item);
        } catch (error) {
            console.log(error);
        }
    }
}

/*PRODUCTO PARA REALIZAR PRUEBAS
const producto = {
    nombre: "Soy un nombre",
    descripcion: "Soy una descripcion",
    codigo: "Soy un codigo2",
    foto: "Soy una foto2",
    precio: 12,
    stock: 12,
    timestamp: 13,
    id: "639a96f0f6025bbcb1feda61",
}
*/


