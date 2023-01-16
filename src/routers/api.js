const { Router } = require("express");
const routeApi = new Router();
const { fork } = require("child_process");

routeApi.get("/api/productos-test", (req, res) => {
    const productosFaker = require("../api/productos.js");
    res.send(productosFaker);
})

routeApi.get("/api/randoms/:cant", (req, res) => {
    const cantidad = Number(req.params.cant) || 100000000;
    const random = fork("./src/api/randomNumbers.js");
    random.send(cantidad);
    random.on("message", (arr) => res.send(arr));
});

module.exports = routeApi;