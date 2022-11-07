//Persistencia de productos en *.txt
const Contenedor = require("./contenedor.js");
const productos = new Contenedor("productos.txt");

//Configuración de servidor Express
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Configuración de engine para render
const handlebars = require("express-handlebars");

app.engine("hbs", handlebars.engine({
    extname: "hbs",
    defaultLayout: "main.hbs",
    layoutsDir: __dirname + "/views",
    helpers: {
        esVacio: function (productos) {
            return productos.length === 0;
        }
    }
}))
app.set("views", "./views");
app.set("view engine", "hbs");

const PORT = 3000;

//Levanto servidor en puerto PORT
const conexionServer = app.listen(PORT, (req, res) => {
    console.log(`Servidor levantado en puerto ${conexionServer.address().port}`);
});

app.get("/", (req, res) => {
    res.render("formulario", {});
});

app.get("/productos", async (req, res) => {
    res.render("lista", { productos: await productos.getAll() });
});

app.post("/productos", async (req, res) => {
    await productos.save(req.body);
    res.render("formulario", {});
});