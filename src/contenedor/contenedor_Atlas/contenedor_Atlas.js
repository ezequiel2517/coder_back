class Contenedor_Atlas{
    constructor(model) {
        this.model = model;
    }

    async save(item) {
        const {default: modelo} = await import(this.model);
        const nuevoItem = new modelo(item);
        await nuevoItem.save();
    }
}

module.exports = Contenedor_Atlas;