const FactoryProductosDAO = require("../DAOs/ProductosDAO/FactoryProductosDAO.js");
const ProductoDTO = require("../DTOs/ProductoDTO.js");

module.exports = class RepositoryProductos {
    constructor() {
        if (RepositoryProductos.instance)
            return RepositoryProductos.instance;
        RepositoryProductos.instance = this;
        this.dao = new FactoryProductosDAO().getProductosDAO("SQL");
    };

    async save({ producto }) {
        try {
            const newProducto = new ProductoDTO(producto);
            await this.dao.save(newProducto);
            return newProducto;
        }
        catch (err) {
            logger.error({ msg: err, route: "RepositoryProductos" });
        }
    };

    async getByTitle(title) {
        return await this.dao.getByTitle(title);
    };

    async getAll() {
        return await this.dao.getAll();
    };

    async deleteByTitle(title) {
        await this.dao.deleteByTitle(title);
        return { msg: "Producto eliminado correctamente." };
    };

    async deleteAll() {
        this.dao.deleteAll();
        return { msg: "Productos eliminados correctamente." };
    };
};