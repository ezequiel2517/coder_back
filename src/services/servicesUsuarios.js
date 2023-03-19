//Persistencia de usuarios en Mongo Atlas
const contenedor_atlas = require("../persistence/contenedor/contenedor_atlas/contenedor_atlas.js");
const usuarios = new contenedor_atlas("./schemas/schemaUsuario.js");
const bcrypt = require("bcrypt");

const registrarUsuario = async (username, password, nombre, direccion, edad, phone) => {
    bcrypt.hash(password, 8, async (error, hash) => {
        if (error) throw error;
        const nuevoUsuario = { username, password: hash, nombre, direccion, edad, phone };
        await usuarios.save(nuevoUsuario);

        //Notificar al admin sobre un nuevo usuario
        const nodemailer = require("../helpers/nodemailer/nodemailer.js");
        nodemailer.notificarRegistro({ username, nombre, direccion, edad, phone });
    });
};

module.exports = { registrarUsuario };