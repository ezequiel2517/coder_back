const ProductosDAOSql = require("./ProductosDAOSql.js");

module.exports = class FactoryProductosDAO {

    constructor() {
        if (FactoryProductosDAO.instance)
            return FactoryProductosDAO.instance;
        FactoryProductosDAO.instance = this;
    };

    getProductosDAO(type) {
        switch (type) {
            case "SQL":
                return new ProductosDAOSql();
                break;

            default:
                break;
        }
    };
};