module.exports = class CompraDTO {
    constructor(data) {
        this.title = data.title,
        this.price = data.price,
        this.username = data.username
    };
};