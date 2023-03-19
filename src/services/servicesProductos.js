const RepositoryProductos = require("../persistence/Repository/RepositoryProductos.js");
const productos = new RepositoryProductos();
const RepositoryCompras = require("../persistence/Repository/RepositoryCompras.js");
const compras = new RepositoryCompras();

const comprarProducto = (title, price, username) => {
    compras.save({ title, price, username });
};

const carritoUsuario = async (username) => {
    return await compras.get(username);
};

const agregarProducto = async (producto) => {
    await productos.save(producto);
}

const obtenerProductos = async () => {
    return await productos.getAll();
}

module.exports = { comprarProducto, carritoUsuario, agregarProducto, obtenerProductos };