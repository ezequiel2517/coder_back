const { io }  = require("../main.js");
const logger = require("../helpers/pino/logger.js");
const { obtenerMensajes, guardarMensaje } = require("../services/servicesMensajes.js");

io.on("connection", async (socket) => {
    logger.warn({ msg: "Nuevo cliente conectado.", route: "sockets" });

    socket.emit("nuevo_cliente_chat", await obtenerMensajes());

    socket.on("addMensaje", async (data) => {
        await guardarMensaje(data);
        io.sockets.emit("newMensaje", data);
    });
});
