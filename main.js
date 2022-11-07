//Persistencia de productos en *.txt
const Contenedor = require("./contenedor.js");
const productos = new Contenedor("productos.txt");

//Configuración de servidor Express
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Configuración de engine para render
app.set("views", "./views");
app.set("view engine", "pug");

const PORT = 3000;

//Levanto servidor en puerto PORT
const conexionServer = app.listen(PORT, (req, res) => {
    console.log(`Servidor levantado en puerto ${conexionServer.address().port}`);
});

app.get("/", (req, res) => {
    res.render("formulario", {});
});

app.get("/productos", async (req, res) => {
    res.render("lista", {productos: await productos.getAll()});
});

app.post("/productos", async (req, res) => {
    await productos.save(req.body);
    res.render("formulario", {});
});

// routeProductos.get("/:id", async (req, res) => {
//     const id = Number(req.params.id);
//     const producto = await productos.getById(id);
//     if (producto)
//         res.json(producto);
//     else {
//         res.status(404);
//         res.json({ error: `No existe el producto con el id: ${id}` });
//     }
// });

// routeProductos.post("/", async (req, res) => {
//     console.log(req.body);
//     res.json({ id:  });
// });