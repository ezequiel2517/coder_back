//Arreglo de productos random con Faker
const faker = require('faker');
faker.locale = "es";
const logger = require("../pino/logger.js");

const randomProductos = [];
try {
    for (let i = 0; i < 5; i++) {
        randomProductos.push({
            thumbnail: faker.image.imageUrl(),
            title: faker.commerce.product(),
            price: faker.commerce.price()
        });
    }
} catch (error) {
    logger.error("Error al ejecutar la API de productos");
}

module.exports = randomProductos;