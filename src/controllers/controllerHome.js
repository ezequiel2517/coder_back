const logger = require("../helpers/pino/logger.js");
const { comprarProducto } = require("../services/servicesProductos.js");

getHome = async (req, res) => {
    logger.info({ msg: "Acceso a ruta", route: "/home" });
    if (req.isAuthenticated()) {
        const fs = require('fs');

        const perfil = fs.readdirSync("public/images").find(file => {
            return file.split(".")[0] == req.user.username
        });

        res.render("home",
            {
                usuario: req.user.username,
                perfil: `http://localhost:${req.socket.localPort}/images/${perfil}`
            })
    }
    else
        res.redirect("/login");
}

postHome = async (req, res) => {
    if (req.isAuthenticated()) {
        const { title, price } = req.body;
        const { username } = req.user;
        try {
            comprarProducto(title, price, username);
            res.status(200).send(JSON.stringify({ res: "Producto agregado con éxito." }));
        }
        catch (err) {
            res.status(400).send(JSON.stringify({ res: "Ocurrió un error al agregar el producto." }));
        }
    }
    else
        res.redirect("/login");
}

module.exports = { getHome, postHome };