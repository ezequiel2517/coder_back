const passport = require("../helpers/passport/passport.js");
const { Router } = require("express");
const routeAuth = new Router();

//Subir imagenes a servidor local
const multer = require("multer");
const path = require('path');

//Configuracion para multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public");
    },
    filename: (req, file, cb) => {
        cb(null, `/images/${req.body.username}${path.extname(file.originalname)}`);
    },
});
const upload = multer({ storage: storage });

const { getRaiz, getLogin, getLogout, getRegistro, postRegistro, getLoginError, getRegistroError } = require("../controllers/controllerAuth.js");

//Raiz
routeAuth.get("/", getRaiz);

//Login
routeAuth.get("/login", getLogin);

routeAuth.post("/login", passport.authenticate("login", {
    successRedirect: "/home",
    failureRedirect: "/login-error"
}))

//Logout
routeAuth.get("/logout", getLogout);

//Registro
routeAuth.get("/registro", getRegistro);

routeAuth.post("/registro",
    upload.single('imagen'),
    passport.authenticate("register", { failureRedirect: "/registro-error" }),
    postRegistro
);

//Errores
routeAuth.get("/login-error", getLoginError);
routeAuth.get("/registro-error", getRegistroError);

module.exports = routeAuth;