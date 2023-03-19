const { getRegistro, getRegistroError, postRegistro, subirImagen } = require("../controllers/controllerUsuarios.js");
const { isLogged } = require("../controllers/controllerAuth.js");
const { Router } = require("express");
const routeUsuarios = new Router();

//Registro
routeUsuarios.get("/registro", getRegistro);
routeUsuarios.post("/registro", subirImagen, postRegistro);
routeUsuarios.get("/registro-error", getRegistroError);

module.exports = routeUsuarios;