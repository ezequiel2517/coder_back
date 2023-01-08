const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema({
    username: {type: String},
    password: {type: String}
})

module.exports = mongoose.model("usuarios", usuarioSchema);