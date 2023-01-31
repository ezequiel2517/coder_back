const { Router } = require("express");
const routeHome = new Router();
const logger = require("../pino/logger.js");

routeHome.get("/home", (req, res) => {
    logger.info({msg: "Acceso a ruta", route: "/home"});
    req.isAuthenticated()
    ?
        res.render("home", { usuario: req.user.username.toUpperCase() })
    :
        res.redirect("/login");
});

module.exports = routeHome;