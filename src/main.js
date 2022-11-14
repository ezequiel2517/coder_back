//Persistencia de productos en *.txt
const Contenedor = require("../contenedor.js");
const productos = new Contenedor("productos.txt");

//Configuración de servidor Express
const express = require("express");
const app = express();
const {Server : HttpServer} = require("http");
const {Server : ioServer} = require("socket.io");
const { Socket } = require("dgram");

const httpServer = new HttpServer(app);
const io = new ioServer(httpServer);

const publicRoot = "./public";
const PORT = 3000;

//Carpeta public visible
app.use(express.static(publicRoot));

//Index en ruta principal
app.get("/", (req, res) => {
    res.send("index.html", {root : publicRoot});
})

//Levanto servidor en puerto PORT
const server = httpServer.listen(PORT, () => {
    console.log(`Server escuchando en puerto ${server.address().port}`)
})

//Websockets
io.on("connection", async (socket) => {
    console.log("Nuevo cliente conectado.")

    socket.emit("nuevo_cliente", await productos.getAll());

    socket.on("addProducto", (data) =>  {
        productos.save(data);
        io.sockets.emit("newProducto", data);
    });

});