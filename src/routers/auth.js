const { getLogin, getLoginError, postLogin, getLogout } = require("../controllers/controllerAuth.js");
const { Router } = require("express");
const routeAuth = new Router();

//Login
routeAuth.get("/login", getLogin);
routeAuth.get("/login-error", getLoginError);
routeAuth.post("/login", postLogin);

//Logout
routeAuth.get("/logout", getLogout);

module.exports = routeAuth;