const IProductosDAO = require("./IProductosDAO.js");
const { sqlite3: configSQL } = require('../../connection/options.js');
const knex = require('knex');
const ProductoDTO = require("../../DTOs/ProductoDTO.js");

module.exports = class ProductoDAOSql extends IProductosDAO {

    constructor() {
        if (ProductoDAOSql.instance)
            return ProductoDAOSql.instance;
        super();
        this.connection = knex(configSQL);
        this.table = "productos";
        ProductoDAOSql.instance = this;
    }

    async save(item) {
        await this.connection(this.table).insert(item);
    };

    async getByTitle(title) {
        const producto = await this.connection(this.table).where('title', title);
        if (producto.length > 0)
            return new ProductoDTO(producto);
        else
            return null;
    };

    async getAll() {
        return (await this.connection(this.table)).map(data => new ProductoDTO(data));
    };

    async deleteByTitle(title) {
        await this.connection(this.table).del().where('title', title);
    };

    async deleteAll() {
        await this.connection(this.table).del();
    };
}