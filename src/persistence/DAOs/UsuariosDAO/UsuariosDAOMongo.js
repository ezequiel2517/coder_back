const IUsuariosDAO = require("./IUsuariosDAO");
const UsuarioDTO = require("../../DTOs/UsuarioDTO.js");
const mongoose = require("mongoose");
const usuarioSchema = new mongoose.Schema({
    username: { type: String },
    password: { type: String },
    nombre: { type: String },
    direccion: { type: String },
    edad: { type: Number },
    phone: { type: Number }
});

module.exports = class UsuariosDAOMongo extends IUsuariosDAO {
    constructor() {
        if (UsuariosDAOMongo.instance)
            return UsuariosDAOMongo.instance;
        super();
        UsuariosDAOMongo.instance = this;
        this.model = mongoose.model("usuarios", usuarioSchema);
    };

    async save(user) {
        const { username, password, nombre, direccion, edad, phone } = user;
        const nuevoUsuario = new UsuarioDTO(username, password, nombre, direccion, edad, phone);
        const modelo = this.model;
        const nuevoItem = new modelo(nuevoUsuario);
        await nuevoItem.save();
        return nuevoUsuario;
    };

    async get(username) {
        const modelo = this.model;
        const res = await modelo.findOne({ username: username });
        const resUsuario = new UsuarioDTO(res.username, res.password, res.nombre, res.direccion, res.edad, res.phone);
        return resUsuario;
    };
};