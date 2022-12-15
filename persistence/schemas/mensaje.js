import mongoose from "mongoose";

const mensajeCollection = "productos";
const mensajeSchema = new mongoose.Schema({
    email: { type: String },
    mensaje: { type: String }
});

export const model = mongoose.model(mensajeCollection, mensajeSchema);