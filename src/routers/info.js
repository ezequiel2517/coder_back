const { Router } = require("express");
const routeInfo = new Router();

const { getInfo } = new require("../controllers/controllerInfo.js");

routeInfo.get("/info", getInfo);

module.exports = routeInfo;