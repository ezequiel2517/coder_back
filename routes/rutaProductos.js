//Defino ruta para productos
import express from "express";
const rutaProductos = express.Router();

//Importo persistencia
import { ProductoDAOFirebase } from "../daos/productoDAOFirebase.js";
const productos = new ProductoDAOFirebase();

//Seteo acceso de administrador (solución TEMPORAL)
const ADMIN = true;

//Endpoints
//Obtener producto por id
rutaProductos.get("/:id", async (req, res) => {
    const idProducto = req.params.id;
    res.json(await productos.getById(idProducto));
});

//Obtener todos los productos
rutaProductos.get("/", async (req, res) => {
    res.json(await productos.getAll());
});

//Agregar producto
rutaProductos.post("/", async (req, res) => {
    if (ADMIN) {
        const saveProducto = req.body.producto;
        const idProducto = await productos.save(saveProducto);
        res.json({
            res: `Producto agregado con éxito con ID ${idProducto}`,
        });
    }
    else {
        res.json({
            error: -1,
            descripcion: "rutaProductos->post no autorizada."
        });
    }
});

//Actualizar producto por id
rutaProductos.put("/:id", async (req, res) => {
    if (ADMIN) {
        const idProducto = req.params.id;
        const producto = req.body.producto;
        const updateProducto = { ...producto, id: idProducto };
        await productos.modify(updateProducto);
        res.json({
            res: `Producto de ID ${idProducto} actualizado con éxito.`
        });
    }
    else {
        res.json({
            error: -1,
            descripcion: "rutaProductos->put no autorizada."
        });
    }
});

//Elimino producto por id
rutaProductos.delete("/:id", async (req, res) => {
    if (ADMIN) {
        const idProducto = req.params.id;
        await productos.deleteById(idProducto);
        res.json({
            res: `Producto de ID ${idProducto} eliminado con éxito.`
        });
    }
    else {
        res.json({
            error: -1,
            descripcion: "rutaProductos->delete no autorizada."
        });
    }
});

export { rutaProductos };