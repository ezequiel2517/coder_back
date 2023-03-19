const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const { comprarProducto } = require("../services/servicesProductos.js");

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

    type Mutation {
        saveCompra(compra: compraInput) : Compra
    }
`);

const rootValue = {
    saveCompra: comprarProducto
}

module.exports = graphqlHTTP({ schema, rootValue, graphiql: true });