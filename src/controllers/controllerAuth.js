const logger = require("../helpers/pino/logger.js");
const passport = require("../helpers/passport/passport.js");

const isLogged = (req, res, next) => {
    req.isAuthenticated()
        ?
        next()
        :
        res.sendFile(process.cwd() + "/public/login.html");
};

const getLogin = (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect("/home");
    }
    logger.info({ msg: "GET a ruta", route: req.route.path });
    res.sendFile(process.cwd() + "/public/login.html");
};

const getLoginError = (req, res) => {
    logger.info({ msg: "GET a ruta", route: req.route.path });
    res.sendFile(process.cwd() + "/public/login-error.html");
};

const postLogin = (req, res, next) => {
    logger.info({ msg: "POST a ruta", route: req.route.path });
    passport.authenticate("login", {
        successRedirect: "/home",
        failureRedirect: "/login-error",
    })(req, res, next);
};

const getLogout = async (req, res) => {
    logger.info({ msg: "GET a ruta", route: req.route.pat });
    if (req.isAuthenticated()) {
        const usuario = req.user.username.toUpperCase();
        await req.session.destroy();
        res.render("logout", { usuario });
    }
    else {
        res.sendFile(process.cwd() + "/public/login.html");
    }
};

module.exports = { isLogged, getLogin, getLoginError, postLogin, getLogout };