const { normalize, schema } = require('normalizr');
const RepositoryMensajes = require("../persistence/Repository/RepositoryMensajes.js");
const mensajes = new RepositoryMensajes();

const autorSchema = new schema.Entity('autor', {}, { idAttribute: 'email' });

const mensajeSchema = new schema.Entity('post', {
    autor: autorSchema
}, { idAttribute: 'id' });

const mensajesSchema = new schema.Entity('posts', {
    mensajes: [mensajeSchema]
}, { idAttribute: 'id' });

const obtenerMensajes = async () => {
    return normalize({
        id: 'mensajes',
        mensajes: await mensajes.getAll(),
    }, mensajesSchema);
};

const guardarMensaje = async (mensaje) => {
    await mensajes.save(mensaje);
};

module.exports = { guardarMensaje, obtenerMensajes };