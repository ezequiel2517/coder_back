const { getRegistro, getRegistroError, postRegistro, subirImagen } = require("../controllers/controllerUsuarios.js");
const { isLogged } = require("../controllers/controllerAuth.js");
const { Router } = require("express");
const routeUsuarios = new Router();

//Registro
routeUsuarios.get("/registro", isLogged, getRegistro);
routeUsuarios.post("/registro", isLogged, subirImagen, postRegistro);
routeUsuarios.get("/registro-error", isLogged, getRegistroError);

module.exports = routeUsuarios;