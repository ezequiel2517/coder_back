const { Router } = require("express");
const routeHome = new Router();

routeHome.get("/home", (req, res) => {
    const usuario = req.session.usuario;
    usuario
    ?
        res.render("home", { usuario: usuario.toUpperCase() })
    :
        res.redirect("/login");
});

module.exports = routeHome;