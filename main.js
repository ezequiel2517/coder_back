//Persistencia de productos en *.txt
const Contenedor = require("./contenedor.js");
const productos = new Contenedor("productos.txt");

//Configuración de servidor Express
const express = require("express");
const { Router } = express;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 3000;
const conexionServer = app.listen(PORT, (req, res) => {
    console.log(`Servidor levantado en puerto ${conexionServer.address().port}`);
});

routeProductos = Router();

routeProductos.get("/", async (req, res) => {
    res.json(await productos.getAll());
});

routeProductos.get("/:id", async (req, res) => {
    const id = Number(req.params.id);
    const producto = await productos.getById(id);
    if (producto)
        res.json(producto);
    else {
        res.status(404);
        res.json({ error: `No existe el producto con el id: ${id}` });
    }
});

routeProductos.post("/", async (req, res) => {
    console.log(req.body);
    res.json({ id: await productos.save(req.body) });
});

routeProductos.put("/:id", async (req, res) => {
    const id = Number(req.params.id);
    const producto = await productos.getById(id);
    if (producto) {
        const productoNew = req.body;
        productoNew.id = id;
        await productos.modify(productoNew);
        res.send(`Se modificó el producto con id ${id}`);
    }
    else {
        res.status(404);
        res.json({ error: `No existe el producto con el id: ${id}` });
    }
});

routeProductos.delete("/:id", async (req, res) => {
    const id = Number(req.params.id);
    const producto = await productos.getById(id);
    if (producto) {
        productos.deleteById(id);
        res.send(`Se eliminó el producto con id ${id}`);
    }
    else {
        res.status(404);
        res.json({ error: `No existe el producto con el id: ${id}` });
    }
});

app.use("/api/productos", routeProductos);
app.use("/productos", express.static(__dirname + "/public"));