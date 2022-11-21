//Defino ruta para productos
import express from "express";
const rutaCarrito = express.Router();

//Importo persistencia
import { Contenedor } from "../persistence/contenedor.js";
const carritos = new Contenedor("persistence/carritos.txt");

//Importo FileSystem
import * as fs from "fs";

//Endpoints
//Obtener todos los productos de un carrito
rutaCarrito.get("/:id/productos", async (req, res) => {
    const idCarrito = req.params.id;
    const productos_carrito = new Contenedor(`persistence/productos_carritos/carrito_${idCarrito}.txt`);
    res.json(await productos_carrito.getAll());
});

//Crear carrito
rutaCarrito.post("/", async (req, res) => {
    const idCarrito = await carritos.save({});
    res.json({
        res: `Carrito con ID ${idCarrito} creado con éxito.`,
    });
});


//Eliminar carrito
rutaCarrito.delete("/:id", async (req, res) => {
    const idCarrito = Number(req.params.id);
    await carritos.deleteById(idCarrito);
    await fs.promises.unlink(`persistence/productos_carritos/carrito_${idCarrito}.txt`);
    res.json({
        res: `Carrito con ID ${idCarrito} eliminado con éxito.`,
    });
});

//Agregar producto al carrito
rutaCarrito.post("/:id/productos", async (req, res) => {
    const idCarrito = Number(req.params.id);
    const saveProducto = req.body.producto;
    const productos_carrito = new Contenedor(`persistence/productos_carritos/carrito_${idCarrito}.txt`);
    const idProducto = await productos_carrito.save(saveProducto);
    res.json({
        res: `Producto agregado con éxito con ID ${idProducto} al carrito de ID ${idCarrito}`,
    });
});

//Eliminar producto del carrito
rutaCarrito.delete("/:id/productos/:id_prod", async (req, res) => {
    const idCarrito = Number(req.params.id);
    const idProducto = Number(req.params.id_prod);
    const productos_carrito = new Contenedor(`persistence/productos_carritos/carrito_${idCarrito}.txt`);
    await productos_carrito.deleteById(idProducto);
    res.json({
        res: `Producto de ID ${idProducto} eliminado con éxito del carrito de ID ${idCarrito}`,
    });
});


export { rutaCarrito };