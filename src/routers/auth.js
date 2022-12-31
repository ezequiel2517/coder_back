const { Router } = require("express");
const routeAuth = new Router();

routeAuth.get("/", (req, res) => {
    req.session.usuario
        ?
        res.redirect("/home")
        :
        res.redirect("/login");
});

routeAuth.get("/login", (req, res) => {
    req.session.usuario
        ?
        res.redirect("/home")
        :
        res.sendFile(process.cwd() + "/public/login.html");
});

routeAuth.get("/logout", async (req, res) => {
    if (req.session.usuario) {
        const usuario = req.session.usuario.toUpperCase();
        await req.session.destroy();
        res.render("logout",  { usuario });
    }
    else {
        res.sendFile(process.cwd() + "/public/login.html");
    }
});

routeAuth.post("/login", (req, res) => {
    req.session.usuario = req.body.usuario;
    res.redirect("/home");
})

module.exports = routeAuth;