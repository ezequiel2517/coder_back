const FactoryProductosDAO = require("../DAOs/ProductosDAO/FactoryProductosDAO.js");
const ProductoDTO = require("../DTOs/ProductoDTO/ProductoDTO.js");

module.exports = class RepositoryProductos{
    constructor(){
        if(RepositoryProductos.instance)
            return RepositoryProductos.instance;
        RepositoryProductos.instance = this;
        this.dao = new FactoryProductosDAO().getProductosDAO("SQL");
    };

    async save(item) {
        const producto = new ProductoDTO(item);
        this.dao.save(producto);
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