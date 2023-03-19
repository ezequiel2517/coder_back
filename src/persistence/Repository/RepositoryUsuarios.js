const FactoryUsuariosDAO = require("../DAOS/UsuariosDAO/FactoryUsuariosDAO.js");
const logger = require("../../helpers/pino/logger.js");

module.exports = class RepositoryUsuarios {
    constructor() {
        if (RepositoryUsuarios.instance)
            return RepositoryUsuarios.instance;
        RepositoryUsuarios.instance = this;
        this.dao = new FactoryUsuariosDAO().getUsuariosDAO("Mongo");
    };

    async save(user) {
        try {
            this.dao.save(user);
        } catch (error) {
            logger.error({ msg: error, route: "RepositoryUsuarios" });
        }
    };

    async get(username) {
        try {
            return this.dao.get(username);
        } catch (error) {
            logger.error({ msg: error, route: "RepositoryUsuarios" });
        }
    };
};