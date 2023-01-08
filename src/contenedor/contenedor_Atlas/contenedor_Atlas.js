class Contenedor_Atlas{
    constructor(model) {
        this.model = model;
    }

    async save(item) {
        const {default: modelo} = await import(this.model);
        const nuevoItem = new modelo(item);
        await nuevoItem.save();
    }

    async findByField(field, value) {
        const {default: modelo} = await import(this.model); 
        const res = await modelo.findOne({[field]: value});
        return res;
    }
}

module.exports = Contenedor_Atlas;