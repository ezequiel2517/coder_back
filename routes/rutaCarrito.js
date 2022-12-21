//Defino ruta para productos
import express from "express";
const rutaCarrito = express.Router();

//Importo persistencia
import { CarritoDAOFirebase } from "../daos/carritoDAOFirebase.js";
const carritos = new CarritoDAOFirebase();

//Endpoints
//Obtener todos los productos de un carrito
rutaCarrito.get("/:id/productos", async (req, res) => {
    const idCarrito = req.params.id;
    const carrito = await carritos.getById(idCarrito);
    res.json(await carrito.productos);
});

//Crear carrito
rutaCarrito.post("/", async (req, res) => {
    const idCarrito = await carritos.save({productos: []});
    res.json({
        res: `Carrito con ID ${idCarrito} creado con éxito.`,
    });
});

//Eliminar carrito
rutaCarrito.delete("/:id", async (req, res) => {
    const idCarrito = req.params.id;
    await carritos.deleteById(idCarrito);
    res.json({
        res: `Carrito con ID ${idCarrito} eliminado con éxito.`,
    });
});

//Agregar producto al carrito
rutaCarrito.post("/:id/productos", async (req, res) => {
    const idCarrito = req.params.id;
    const saveProducto = req.body.producto;
    const carrito = await carritos.getById(idCarrito);
    carrito.productos.push(saveProducto);
    await carritos.modify(carrito);
    res.json({
        res: `Producto agregado con éxito con ID ${saveProducto.id} al carrito de ID ${idCarrito}`,
    });
});

//Eliminar producto del carrito
rutaCarrito.delete("/:id/productos/:id_prod", async (req, res) => {
    const idCarrito = req.params.id;
    const idProducto = req.params.id_prod;
    const carrito = await carritos.getById(idCarrito);
    carrito.productos = carrito.productos.filter(producto => producto.id!=idProducto);
    await carritos.modify(carrito);
    res.json({
        res: `Producto de ID ${idProducto} eliminado con éxito del carrito de ID ${idCarrito}`,
    });
});


export { rutaCarrito };