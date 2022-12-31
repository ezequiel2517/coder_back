//Iniciar connection SQL
const initialize = require("./connection/initializeSQL.js");
initialize;

//Persistencia en SQL
const { sqlite3: configSQL } = require('./connection/options.js');
const Contenedor_SQL = require('./contenedor/contenedor_sql.js');
const mensajes = new Contenedor_SQL("mensajes", configSQL);
const productos = new Contenedor_SQL('productos', configSQL);

//Configuracion de servidor Express
const express = require("express");
const app = express();
const { Server: HttpServer } = require("http");
const { Server: ioServer } = require("socket.io");
const PORT = 3000;

//Para poder usar JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Configuracion de websockets
const httpServer = new HttpServer(app);
const io = new ioServer(httpServer);

//Configuracion para sesiones de usuarios
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const SECRET = 'secret';

app.use(cookieParser());
app.use(session({
    store: MongoStore.create({
        mongoUrl: "mongodb+srv://ezequiel:ezequiel@cluster0.v5hpbf0.mongodb.net/sessions?retryWrites=true&w=majority",
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
        ttl: 60
    }),
    secret: SECRET,
    resave: false,
    saveUninitialized: false
}));

//Configuración de engine para render
const path = require("path");
app.set('views', path.join(__dirname, '../src/views'));
app.set('view engine','ejs');

//Importar rutas
const routeApi = require("./routers/api.js");
app.use(routeApi);
const routeHome = require("./routers/home.js")
app.use(routeHome);
const routeAuth = require("./routers/auth.js");
app.use(routeAuth);

//Levantar servidor en puerto PORT
const server = httpServer.listen(PORT, () => {
    console.log(`Server escuchando en puerto ${server.address().port}`)
})

//Websockets
io.on("connection", async (socket) => {
    console.log("Nuevo cliente conectado.");

    /*Cuando hay un usuario nuevo se le envian 
    los productos y mensajes (normalizados)*/
    socket.emit("nuevo_cliente_productos", await productos.getAll());

    const getChatNormalizer = require("./normalizr/mensajes.js");
    socket.emit("nuevo_cliente_chat", getChatNormalizer(await mensajes.getAll()));

    /*Cuando se agrega un nuevo 
    usuario o mensaje se persiste*/
    socket.on("addProducto", (data) => {
        productos.save(data);
        io.sockets.emit("newProducto", data);
    });

    socket.on("addMensaje", (data) => {
        mensajes.save(data);
        io.sockets.emit("newMensaje", data);
    });
});