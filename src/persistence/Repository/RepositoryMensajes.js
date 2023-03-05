const FactoryMensajesDAO = require("../DAOs/MensajesDAO/FactoryMensajesDAO");
const MensajeDTO = require("../DTOs/MensajeDTO/MensajeDTO");

module.exports = class RepositoryMensajes {
    constructor() {
        if (RepositoryMensajes.instance)
            return RepositoryMensajes.instance;
        RepositoryMensajes.instance = this
        this.dao = new FactoryMensajesDAO().getMensajesDAO("SQL");
    };

    async save(item) {
        const mensaje = new MensajeDTO(item);
        this.dao.save(mensaje);
    };

    async getById(id) {
        return this.dao.getById(id);
    };

    async getAll() {
        return this.dao.getAll();
    };

    async deleteById(id) {
        this.dao.deleteById(id);
    };

    async deleteAll() {
        this.dao.deleteAll();
    };
};