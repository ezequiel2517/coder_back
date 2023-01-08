const { Router } = require("express");
const routeHome = new Router();

routeHome.get("/home", (req, res) => {
    req.isAuthenticated()
    ?
        res.render("home", { usuario: req.user.username.toUpperCase() })
    :
        res.redirect("/login");
});

module.exports = routeHome;