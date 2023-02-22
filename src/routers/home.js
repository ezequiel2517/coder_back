const { Router } = require("express");
const routeHome = new Router();
const { getHome, postHome } = require("../controllers/controllerHome.js");

routeHome.get("/home", getHome);
routeHome.post("/home", postHome)

module.exports = routeHome;