const notificarCompra = (nombre, phone, carrito) => {
    const nodemailer = require("../helpers/nodemailer/nodemailer.js");
    nodemailer.notificarCompra( nombre, phone, carrito );

    const enviarSMS = require("../helpers/twilio/twilio.js");
    enviarSMS(`Pedido realizado con éxito.`, `+${phone}`);
    enviarSMS(`Nuevo pedido realizado por ${nombre}. Celular: +${phone}`, process.env.MOBILE_ADMIN);
};

module.exports = { notificarCompra };