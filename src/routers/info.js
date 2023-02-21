const { Router } = require("express");
const routeInfo = new Router();
const logger = require("../helpers/pino/logger.js");
const { fork } = require("child_process");

routeInfo.get("/info", (req, res) => {
    logger.info({ msg: "Acceso a ruta", route: "/info" });

    const info = fork(process.cwd() + "/src/helpers/info/info.js");
    info.send("message");
    info.on("message", (info) => {
        //Agrego info al log (req. de entregable)
        logger.info({ msg: info, route: "/info" });

        req.isAuthenticated()
            ?
            res.render("info", info)
            :
            res.redirect("/login");
    });
});

module.exports = routeInfo;