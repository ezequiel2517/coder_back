const passport = require("../passport/passport.js");
const { Router } = require("express");
const routeAuth = new Router();
const logger = require("../pino/logger.js");

//Raiz
routeAuth.get("/", (req, res) => {
    req.isAuthenticated()
        ?
        res.redirect("/home")
        :
        res.redirect("/login");
});

//Login
routeAuth.get("/login", (req, res) => {
    logger.info({msg: "Acceso a ruta", route: "/login"});
    req.isAuthenticated()
        ?
        res.redirect("/home")
        :
        res.sendFile(process.cwd() + "/public/login.html");
});

routeAuth.post("/login", passport.authenticate("login", {
    successRedirect: "/home",
    failureRedirect: "/login-error"
}))

//Logout
routeAuth.get("/logout", async (req, res) => {
    logger.info({msg: "Acceso a ruta", route: "/logout"});
    if (req.isAuthenticated()) {
        const usuario = req.user.username.toUpperCase();
        await req.session.destroy();
        res.render("logout",  { usuario });
    }
    else {
        res.sendFile(process.cwd() + "/public/login.html");
    }
});

//Registro
routeAuth.get("/registro", (req, res) => {
    logger.info({msg: "Acceso a ruta", route: "/registro"});
    req.isAuthenticated()
        ?
        res.redirect("/home")
        :
        res.sendFile(process.cwd() + "/public/registro.html");
});

routeAuth.post("/registro", passport.authenticate("register", {
    successRedirect: "/home",
    failureRedirect: "/registro-error"
}))

//Errores
routeAuth.get("/login-error", (req, res) => {
    logger.info({msg: "Acceso a ruta", route: "/login.error"});
    res.sendFile(process.cwd() + "/public/login-error.html");
})

routeAuth.get("/registro-error", (req, res) => {
    logger.info({msg: "Acceso a ruta", route: "/registro-error"});
    res.sendFile(process.cwd() + "/public/registro-error.html");
})

module.exports = routeAuth;