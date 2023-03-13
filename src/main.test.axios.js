const axios = require("axios");
const expect = require("chai").expect;
const faker = require("faker");

const producto = {
  title: faker.commerce.product(),
  price: faker.commerce.price(),
  thumbnail: faker.image.image()
}

describe("Probando CRUD de Productos - CASO OK", () => {
  it("Borrando todos los productos", async () => {
    const { data: res } = await axios.delete("http://localhost:8070/api/deleteAll-productos");
    expect(res).to.include.keys("msg");
    expect(res.msg).to.eql("Productos eliminados correctamente.");
  });

  it("Agregando producto - CASO OK", async () => {
    const { data: res } = await axios.post("http://localhost:8070/api/save-productos", producto);
    expect(res).to.include.keys("title", "title", "thumbnail");
    expect(res.title).to.eql(producto.title);
    expect(res.price).to.eql(producto.price);
    expect(res.thumbnail).to.eql(producto.thumbnail);
  });
  
  it("Agregando producto - CASO ERROR - FORMATO INCORRECTO", async () => {
    const { data: res } = await axios.post("http://localhost:8070/api/save-productos", {});
    expect(res).to.include.keys("error");
  });

  it("Agregando producto - CASO ERROR - YA EXISTE", async () => {
    const { data: res } = await axios.post("http://localhost:8070/api/save-productos", producto);
    expect(res).to.include.keys("error");
  });

  it("Borrando un producto por title - CASO OK", async () => {
    const { data: res } = await axios.delete("http://localhost:8070/api/deleteByTitle-productos", {data: { title: producto.title }});
    expect(res).to.include.keys("msg");
    expect(res.msg).to.eql("Producto eliminado correctamente.");
  });

});