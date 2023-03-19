const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const { carritoUsuario, comprarProducto} = require("../services/servicesProductos.js");

const schema = new buildSchema(`
    type Compra {
        title: String
        price: Int
        username: String
    }

    input compraInput {
        title: String
        price: Int
        username: String
    }

    type Query {
        getCompras(username: String) : [Compra]
    }

    type Mutation {
        saveCompra(compra: compraInput) : Compra
    }
`);

const rootValue = {
    getCompras: carritoUsuario,
    saveCompra: comprarProducto
}

module.exports = graphqlHTTP({ schema, rootValue, graphiql: true });