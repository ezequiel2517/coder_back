const passport = require("../passport/passport.js");
const { Router } = require("express");
const routeAuth = new Router();

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
    req.isAuthenticated()
        ?
        res.redirect("/home")
        :
        res.sendFile(process.cwd() + "/public/registro.html");
});

routeAuth.post("/registro", passport.authenticate("register", {
    successRedirect: "/home",
    failureRedirect: "/register-error"
}))

//Errores
routeAuth.get("/login-error", (req, res) => {
    res.sendFile(process.cwd() + "/public/login-error.html");
})

routeAuth.get("/registro-error", (req, res) => {
    res.sendFile(process.cwd() + "/public/registro-error.html");
})

module.exports = routeAuth;