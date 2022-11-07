//Persistencia de productos en *.txt
const Contenedor = require("./contenedor.js");
const productos = new Contenedor("productos.txt");

//Configuración de servidor Express
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Configuración de engine para render
app.set("view engine", "ejs");

const PORT = 3000;

//Levanto servidor en puerto PORT
const conexionServer = app.listen(PORT, (req, res) => {
    console.log(`Servidor levantado en puerto ${conexionServer.address().port}`);
});

app.get("/", (req, res) => {
    res.render("formulario", {});
});

app.get('/productos', async (req, res) => {
    const productosRender = await productos.getAll();
    res.render('lista', {
        productos: productosRender
    });
});

app.post("/productos", async (req, res) => {
    await productos.save(req.body);
    res.render("formulario", {});
});