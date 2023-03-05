//Persistencia para carritos de usuario
const contenedor_atlas = require("../persistence/contenedor/contenedor_Atlas/contenedor_atlas.js");
const compras = new contenedor_atlas("./schemas/schemaCompra.js");

const comprarProducto = (title, price, username) => {
    compras.save({ title, price, username });
};

const carritoUsuario = async (username) => {
    return await compras.findManyByField("username", username)
};

module.exports = { comprarProducto, carritoUsuario };