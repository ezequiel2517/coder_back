const request = require("supertest")("http://localhost:8070");
const expect = require("chai").expect;
const faker = require("faker");

const producto = {
  title: faker.commerce.product(),
  price: faker.commerce.price(),
  thumbnail: faker.image.image()
}

describe("Probando CRUD de Productos", () => {
  it("Borrando todos los productos", async () => {
    const { _body: res } = await request.delete("/api/deleteAll-productos");
    expect(res).to.include.keys("msg");
    expect(res.msg).to.eql("Productos eliminados correctamente.");
  });

  it("Agregando producto - CASO OK", async () => {
    const { _body: res } = await request.post("/api/save-productos").send(producto);
    expect(res).to.include.keys("title", "title", "thumbnail");
    expect(res.title).to.eql(producto.title);
    expect(res.price).to.eql(producto.price);
    expect(res.thumbnail).to.eql(producto.thumbnail);
  });

  it("Agregando producto - CASO ERROR - FORMATO INCORRECTO", async () => {
    const { _body: res } = await request.post("/api/save-productos").send({});
    expect(res).to.include.keys("error");
  });

  it("Agregando producto - CASO ERROR - YA EXISTE", async () => {
    const { _body: res } = await request.post("/api/save-productos").send(producto);
    expect(res).to.include.keys("error");
  });

  it("Borrando todos los productos", async () => {
    const { _body: res } = await request.delete("/api/deleteByTitle-productos").send({ title: producto.title });
    expect(res).to.include.keys("msg");
    expect(res.msg).to.eql("Producto eliminado correctamente.");
  });

});