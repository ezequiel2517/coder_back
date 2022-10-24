const express = require("express");
const Contenedor = require("./contenedor.js");
const app = express();
const PORT = 3000;

const conexionServer = app.listen(PORT, (require, response)=>{
    console.log(`Servidor levantado en puerto ${conexionServer.address().port}`);
})

app.get("/productos", async (request, response)=>{
    productos = new Contenedor("productos.txt");
    response.send(await productos.getAll());
})

app.get("/productoRandom", async(request, response)=>{
    productos = new Contenedor("productos.txt");
    let idRandom = Math.ceil(Math.random()*(await productos.getMaxId()));
    response.send(await productos.getById(idRandom));
})