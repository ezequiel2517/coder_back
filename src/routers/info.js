const { Router } = require("express");
const yargs = require("yargs");
const routeInfo = new Router();
const logger = require("../pino/logger.js");

routeInfo.get("/info", (req, res) => {
    logger.info({msg: "Acceso a ruta", route: "/info"});
    const numCpu = require("os").cpus().length;
    const info = {
        args: yargs.argv,
        so: process.platform,
        version: process.version,
        memory: process.memoryUsage.rss(),
        execPath: process.execPath,
        pid: process.pid,
        src: process.cwd(),
        cpus: numCpu
    };

    req.isAuthenticated()
        ?
        res.render("info", info)
        :
        res.redirect("/login");
});

module.exports = routeInfo;