const { Router } = require("express");
const routeCarrito = new Router();
const { getCarrito, postCarrito } = require("../controllers/controllerCarrito.js");

routeCarrito.get("/carrito", getCarrito);
routeCarrito.post("/carrito", postCarrito);

module.exports = routeCarrito;