const ComprasDAOMongo = require("./ComprasDAOMongo.js");

module.exports = class FactoryComprasDAO {

    constructor() {
        if (FactoryComprasDAO.instance)
            return FactoryComprasDAO.instance;
        FactoryComprasDAO.instance = this;
    };

    getComprasDAO(type) {
        switch (type) {
            case "Mongo":
                return new ComprasDAOMongo();
                break;
            default:
                break;
        }
    };
};