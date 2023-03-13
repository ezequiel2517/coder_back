const { Router } = require("express");
const routeApi = new Router();
const { fork } = require("child_process");
const logger = require("../helpers/pino/logger.js");
const RepositoryProductos = new require("../persistence/Repository/RepositoryProductos.js");
const productos = new RepositoryProductos();

routeApi.get("/api/productos-test", (req, res) => {
    logger.info({ msg: "Acceso a ruta", route: "/api/productos-test" });
    const productosFaker = require("../helpers/radomGenerate/randomProductos.js");
    res.send(productosFaker);
})

routeApi.get("/api/randoms/", (req, res) => {
    logger.info({ msg: "Acceso a ruta", route: "/api/randoms" });
    const cantidad = Number(req.query.cant) || 100000000;
    const random = fork("./src/helpers/radomGenerate/randomNumbers.js");
    random.send(cantidad);
    random.on("message", (arr) => res.send(arr));
});

routeApi.get("/api/getAll-productos", async (req, res) => {
    res.send(await productos.getAll());
});

routeApi.post("/api/save-productos", async (req, res) => {
    const { title, price, thumbnail } = req.body;
    try {
        res.send(await productos.save( { title, price, thumbnail }));
    }
    catch(err) {
        res.send({error: err.message});
    }
});

routeApi.delete("/api/deleteAll-productos", async (req, res) => {
    res.send(await productos.deleteAll());
});

routeApi.delete("/api/deleteByTitle-productos", async (req, res) => {
    const { title } = req.body;
    res.send(await productos.deleteByTitle(title));
});

module.exports = routeApi;