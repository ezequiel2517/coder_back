const FactoryProductosDAO = require("../DAOs/ProductosDAO/FactoryProductosDAO.js");
const ProductoDTO = require("../DTOs/ProductoDTO/ProductoDTO.js");

module.exports = class RepositoryProductos {
    constructor() {
        if (RepositoryProductos.instance)
            return RepositoryProductos.instance;
        RepositoryProductos.instance = this;
        this.dao = new FactoryProductosDAO().getProductosDAO("SQL");
    };

    async save(item) {
        try {
            if (await this.dao.getByTitle(item.title))
                throw new Error("Ya existe un producto con el mismo title.");
            const producto = new ProductoDTO(item);
            await this.dao.save(producto);
            return item;
        }
        catch (err) {
            throw new Error(err.msg);
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