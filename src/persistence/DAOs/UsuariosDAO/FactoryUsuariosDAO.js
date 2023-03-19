const UsuariosDAOMongo = require("./UsuariosDAOMongo.js");

module.exports = class FactoryUsuariosDAO {

    constructor() {
        if (FactoryUsuariosDAO.instance)
            return FactoryUsuariosDAO.instance;
        FactoryUsuariosDAO.instance = this;
    };

    getUsuariosDAO(type) {
        switch (type) {
            case "Mongo":
                return new UsuariosDAOMongo();
                break;
            default:
                break;
        }
    };
};