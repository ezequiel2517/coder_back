const IProductosDAO = require("./IProductosDAO.js");
const { sqlite3: configSQL } = require('../../connection/options.js');
const knex = require('knex');
const ProductoDTO = require("../../DTOs/ProductoDTO/ProductoDTO.js");

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

    async getById(id) {
        return new ProductoDTO(await this.connection(this.table).where('id', id));
    };

    async getAll() {
        return (await this.connection(this.table)).map(data => new ProductoDTO(data)) ;
    };

    async deleteById(id) {
        await this.connection(this.table).del().where('id', id);
    };

    async deleteAll() {
        await this.connection(this.table).del();
    };
}