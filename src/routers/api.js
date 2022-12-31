const { Router } = require("express");
const routeApi = new Router();

routeApi.get("/api/productos-test", (req, res) => {
    const productosFaker = require("../api/productos.js");
    res.send(productosFaker);
})

module.exports = routeApi;