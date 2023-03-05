const MensajesDAOSql = require("./MensajesDAOSql.js");

module.exports = class FactoryMensajesDAO {

    constructor() {
        if (FactoryMensajesDAO.instance)
            return FactoryMensajesDAO.instance;
        FactoryMensajesDAO.instance = this;
    };

    getMensajesDAO(type) {
        switch (type) {
            case "SQL":
                return new MensajesDAOSql();
                break;

            default:
                break;
        }
    };
};