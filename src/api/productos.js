//Arreglo de productos random con Faker
const faker = require('faker');
faker.locale = "es";

const productos = [];
for (let i = 0; i < 5; i++) {
    productos.push({
        thumbnail: faker.image.imageUrl(),
        title: faker.commerce.product(),
        price: faker.commerce.price()
    });
}

module.exports = productos;