const FactoryComprasDAO = require("../DAOS/ComprasDAO/FactoryComprasDAO.js");
const logger = require("../../helpers/pino/logger.js");

module.exports = class RepositoryCompras {
    constructor() {
        if (RepositoryCompras.instance)
            return RepositoryCompras.instance;
            RepositoryCompras.instance = this;
        this.dao = new FactoryComprasDAO().getComprasDAO("Mongo");
    };

    async save(compra) {
        try {
            this.dao.save(compra);
        } catch (error) {
            logger.error({ msg: error, route: "RepositoryCompras" });
        }
    };

    async get(username) {
        try {
            return await this.dao.get(username);
        } catch (error) {
            logger.error({ msg: error, route: "RepositoryCompras" });
        }
    };
};