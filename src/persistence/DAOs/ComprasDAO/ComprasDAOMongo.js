const IComprasDAO = require("./IComprasDAO");
const CompraDTO = require("../../DTOs/CompraDTO.js");
const mongoose = require("mongoose");

const compraSchema = new mongoose.Schema({
    title: {type: String},
    price: {type: Number},
    username: {type: String}
})

module.exports = class ComprasDAOMongo extends IComprasDAO {
    constructor() {
        if (ComprasDAOMongo.instance)
            return ComprasDAOMongo.instance;
        super();
        ComprasDAOMongo.instance = this;
        this.model = mongoose.model("carritos", compraSchema);
    };

    async save(compra) {
        const nuevaCompra = new CompraDTO(compra);
        const modelo = this.model;
        const nuevoItem = new modelo(nuevaCompra);
        await nuevoItem.save();
        return nuevaCompra;
    };

    async get(username) {
        const modelo = this.model;
        const carritoUsuario = (await modelo.find({username: username})).map(data => new CompraDTO(data));
        return carritoUsuario;
    };
};