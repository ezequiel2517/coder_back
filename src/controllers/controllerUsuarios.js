const logger = require("../helpers/pino/logger.js");
const passport = require("../helpers/passport/passport.js");
const multer = require("multer");
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public");
    },
    filename: (req, file, cb) => {
        cb(null, `/images/${req.body.username}${path.extname(file.originalname)}`);
    },
});

const upload = multer({ storage: storage });

const subirImagen = (req, res, next)=>{
    upload.single('imagen')(req, res, next);
}

const getRegistro = (req, res) => {
    logger.info({ msg: "GET a ruta", route: req.route.path });
    res.sendFile(process.cwd() + "/public/registro.html");
};

const postRegistro = (req, res, next) => {
    passport.authenticate("registro", {
        successRedirect: "/home",
        failureRedirect: "/registro-error",
    })(req, res, next);
};

const getRegistroError = (req, res) => {
    logger.info({ msg: "GET a ruta", route: req.route.path });
    res.sendFile(process.cwd() + "/public/registro-error.html");
};

module.exports = { getRegistro, getRegistroError, postRegistro, subirImagen };