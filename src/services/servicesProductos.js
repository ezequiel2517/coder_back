const RepositoryProductos = require("../persistence/Repository/RepositoryProductos.js");
const productos = new RepositoryProductos();
const RepositoryCompras = require("../persistence/Repository/RepositoryCompras.js");
const CompraDTO = require("../persistence/DTOs/CompraDTO.js");
const compras = new RepositoryCompras();

const comprarProducto = async ({ compra }) => {
    console.log(compra);
    const newCompra = new CompraDTO({title: compra.title, price: compra.price, username: compra.username});
    await compras.save(newCompra);
    return newCompra;
};

const carritoUsuario = async ({ username }) => {
    console.log(username);
    return await compras.get(username);
};

const agregarProducto = async (producto) => {
    return await productos.save(producto);
}

const obtenerProductos = async () => {
    return await productos.getAll();
}

module.exports = { comprarProducto, carritoUsuario, agregarProducto, obtenerProductos };