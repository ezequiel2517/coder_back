const { io } = require("../main.js");
const logger = require("../helpers/pino/logger.js");
const { obtenerProductos, agregarProducto } = require("../services/servicesProductos.js");

io.on("connection", async (socket) => {
    logger.warn({ msg: "Nuevo cliente conectado.", route: "sockets" });

    socket.emit("nuevo_cliente_productos", await obtenerProductos());

    socket.on("addProducto", async (data) => {
        await agregarProducto(data);
        io.sockets.emit("newProducto", data);
    });
});
