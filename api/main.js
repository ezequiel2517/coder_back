//Configuración de servidor Express
import express from "express";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 8080;

//Levanto servidor en puerto PORT
const server = app.listen(PORT, (req, res) => {
    console.log(`Servidor levantado en puerto ${server.address().port}`);
});

//Importo y uso rutaProductos
import { rutaProductos } from "../routes/rutaProductos.js";
import { rutaCarrito } from "../routes/rutaCarrito.js";

app.use("/api/productos", rutaProductos);
app.use("/api/carrito", rutaCarrito);
app.get("/api/:ruta", (req, res) => {
    const ruta = req.params.ruta;
    res.json({
        error: -2,
        descripcion: `Ruta ${ruta} no implementada.`
    });
})