//Iniciar connection SQL
const initialize = require("./persistence/connection/initialize.js");
initialize;

//yargs para setear puerto y modo por parametro
const yargs = require("yargs")(process.argv.slice());
const { puerto: PORT, modo: MODO } = yargs
    .alias({
        p: "puerto",
        m: "modo"
    })
    .default({
        puerto: 8080,
        modo: "FORK"
    })
    .argv;

const cluster = require("cluster");
const numCpu = require("os").cpus().length;

//Logger de Pino
const logger = require("./helpers/pino/logger.js");

if (cluster.isPrimary && MODO == "CLUSTER") {
    for (let i = 0; i < numCpu; i++) {
        cluster.fork();
    }
}
else {
    //Configuracion de servidor Express
    const express = require("express");
    const app = express();
    const { Server: HttpServer } = require("http");

    //Para poder usar JSON
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    //Compression
    const compression = require("compression");
    app.use(compression());

    //Configuracion de websockets
    const httpServer = new HttpServer(app);
    //Websockets
    const { Server: ioServer } = require("socket.io");
    const io = new ioServer(httpServer);
    module.exports = { io };

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

    const passport = require("passport");
    app.use(passport.initialize());
    app.use(passport.session());

    //Configuración de engine para render
    const path = require("path");
    app.set('views', path.join(__dirname, '../src/views'));
    app.set('view engine', 'ejs');

    //Importar rutas
    const routeAuth = require("./routers/auth.js");
    app.use(routeAuth);
    const routeApi = require("./routers/api.js");
    app.use(routeApi);
    const routeHome = require("./routers/home.js")
    app.use(routeHome);
    const routeInfo = require("./routers/info.js");
    app.use(routeInfo);
    const routeCarrito = require("./routers/carrito.js");
    app.use(routeCarrito);
    const routeUsuarios = require("./routers/usuarios.js");
    app.use(routeUsuarios);

    //Carpeta pública para fotos de perfil
    app.use("/images", express.static(path.resolve('./public/images')));

    app.get("*", (req, res)=>{
        logger.warn({msg: "GET a ruta invalida", route: req.params[0]});
        res.redirect("/");
    });

    //Levantar servidor en puerto PORT
    const server = httpServer.listen(PORT, () => {
        logger.warn({ msg: `Server escuchando en puerto ${server.address().port}` });
    })

    //WebSockets
    require("./sockets/socketsMensaje.js");
    require("./sockets/socketsProductos.js");
}
