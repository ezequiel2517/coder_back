const RepositoryUsuarios = require("../persistence/Repository/RepositoryUsuarios.js");
const usuarios = new RepositoryUsuarios();

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

const obtenerUsuario = async (username) => {
    return await usuarios.get(username)
};

module.exports = { registrarUsuario, obtenerUsuario };