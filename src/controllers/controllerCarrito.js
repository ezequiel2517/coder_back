//dotenv para manejar variables de entorno
const dotenv = require("dotenv");
dotenv.config();

const { carritoUsuario } = require("../services/servicesProductos.js");
const { notificarCompra } = require("../services/servicesAlerts.js");

const getCarrito = async (req, res) => {
    if (req.isAuthenticated())
        res.render("carrito", { productos: await carritoUsuario({ username: req.user.username }) });
    else
        res.redirect("/login");
}

const postCarrito = async (req, res) => {
    const pedidos = await carritoUsuario(req.user.username);
    const { nombre, phone } = req.user;
    notificarCompra( nombre, phone, pedidos );
    res.status(200).send(JSON.stringify({ res: "Compra realizada con éxito." }));
}

module.exports = { getCarrito, postCarrito };