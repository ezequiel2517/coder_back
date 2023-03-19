const IMensajesDAO = require("./IMensajesDAO.js");
const { sqlite3: configSQL } = require('../../connection/options.js');
const knex = require('knex');
const MensajeDTO = require("../../DTOs/MensajeDTO.js");

module.exports = class MensajesDAOSql extends IMensajesDAO {
    constructor() {
        if (MensajesDAOSql.instance) 
            return MensajesDAOSql.instance;
        super();
        this.connection = knex(configSQL);
        this.table = "mensajes";
        MensajesDAOSql.instance = this;
    }

    async save(item) {
        await this.connection(this.table).insert(item);
    };

    async getById(id) {
        return new MensajeDTO(await this.connection(this.table).where('id', id));
    };

    async getAll() {
        return (await this.connection(this.table)).map(data => new MensajeDTO(data));
    };

    async deleteById(id) {
        await this.connection(this.table).del().where('id', id);
    };

    async deleteAll() {
        await this.connection(this.table).del();
    };
}