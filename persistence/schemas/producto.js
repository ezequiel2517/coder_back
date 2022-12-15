import mongoose from "mongoose";

const productoCollection = "productos";
const productoSchema = new mongoose.Schema({
    nombre: { type: String },
    descripcion: { type: String },
    codigo: { type: String },
    foto: { type: String },
    precio: { type: Number },
    stock: { type: Number },
    timestamp: { type: Number }
});

export const model = mongoose.model(productoCollection, productoSchema);