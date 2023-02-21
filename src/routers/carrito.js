const { Router } = require("express");
const routeCarrito = new Router();

//dotenv para manejar variables de entorno
const dotenv = require("dotenv");
dotenv.config();

const { compras } = require("../persistence/connection/initialize");

routeCarrito.get("/carrito", async (req, res) => {
    if (req.isAuthenticated())
        res.render("carrito", { productos: await compras.findManyByField("username", req.user.username) });
    else
        res.redirect("/login");
});

routeCarrito.post("/carrito", async (req, res) => {
    //Notificar al admin sobre un nuevo pedido
    const nodemailer = require("../helpers/nodemailer/nodemailer.js");
    const carrito = await compras.findManyByField("username", req.user.username);
    nodemailer.notificarCompra({ nombre: req.user.nombre, phone: req.user.phone, pedidos: carrito });

    const enviarSMS = require("../helpers/twilio/twilio.js");
    enviarSMS(`Pedido realizado con éxito.`, `+${req.user.phone}`);
    enviarSMS(`Nuevo pedido realizado por ${req.user.nombre}. Celular: +${req.user.phone}`, process.env.MOBILE_ADMIN);
    res.status(200).send(JSON.stringify({ res: "Compra realizada con éxito." }));
});

module.exports = routeCarrito;