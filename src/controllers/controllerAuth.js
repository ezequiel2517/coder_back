const logger = require("../helpers/pino/logger.js");
const { registrarUsuario } = require("../services/servicesUsuarios.js");

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
    try {
        registrarUsuario(username, password, nombre, direccion, edad, phone);
        res.redirect("/home");
    }
    catch (err) {
        logger.error({ msg: err, route: "/registro" });
    }
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