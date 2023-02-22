const logger = require("../helpers/pino/logger.js");
const bcrypt = require("bcrypt");

//Persistencia de usuarios en Mongo Atlas
const contenedor_atlas = require("../persistence/contenedor/contenedor_atlas/contenedor_atlas.js");
const usuarios = new contenedor_atlas("./schemas/schemaUsuario.js");

const getRaiz = (req, res) => {
    req.isAuthenticated()
        ?
        res.redirect("/home")
        :
        res.redirect("/login");
}

const getLogin = (req, res) => {
    logger.info({ msg: "Acceso a ruta", route: "/login" });
    req.isAuthenticated()
        ?
        res.redirect("/home")
        :
        res.sendFile(process.cwd() + "/public/login.html");
}

const getLogout = async (req, res) => {
    logger.info({ msg: "Acceso a ruta", route: "/logout" });
    if (req.isAuthenticated()) {
        const usuario = req.user.username.toUpperCase();
        await req.session.destroy();
        res.render("logout", { usuario });
    }
    else {
        res.sendFile(process.cwd() + "/public/login.html");
    }
}

const getRegistro = (req, res) => {
    logger.info({ msg: "Acceso a ruta", route: "/registro" });
    req.isAuthenticated()
        ?
        res.redirect("/home")
        :
        res.sendFile(process.cwd() + "/public/registro.html");
}

const postRegistro = (req, res) => {
    const { password, username, nombre, direccion, edad, phone } = req.body;
    bcrypt.hash(password, 8, async (error, hash) => {
        if (error) throw error;
        const nuevoUsuario = { username, password: hash, nombre, direccion, edad, phone };
        await usuarios.save(nuevoUsuario);

        //Notificar al admin sobre un nuevo usuario
        const nodemailer = require("../helpers/nodemailer/nodemailer.js");
        nodemailer.notificarRegistro({ username, nombre, direccion, edad, phone });

        res.redirect("/home");
    })
}

const getLoginError = (req, res) => {
    logger.info({ msg: "Acceso a ruta", route: "/login.error" });
    res.sendFile(process.cwd() + "/public/login-error.html");
}

const getRegistroError = (req, res) => {
    logger.info({ msg: "Acceso a ruta", route: "/registro-error" });
    res.sendFile(process.cwd() + "/public/registro-error.html");
}

module.exports = { getRaiz, getLogin, getLogout, getRegistro, postRegistro, getLoginError, getRegistroError };