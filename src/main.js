//Persistencia de productos en SQL
const options = require('./connection/options.js')
const Contenedor_SQL = require('./contenedor/contenedor_sql.js')
const chat = new Contenedor_SQL('chat', options.sqlite3);
const productos = new Contenedor_SQL('productos', options.mysql);

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

    socket.emit("nuevo_cliente_productos", await productos.getAll());

    socket.emit("nuevo_cliente_chat", await chat.getAll());

    socket.on("addProducto", (data) =>  {
        productos.save(data);
        io.sockets.emit("newProducto", data);
    });

    socket.on("addMensaje", (data) =>  {
        chat.save(data);
        io.sockets.emit("newMensaje", data);
    });

});