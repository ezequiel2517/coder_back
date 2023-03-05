module.exports = class ProductoDTO {
    constructor(data){
        this.title = data.title,
        this.price = data.price,
        this.thumbnail = data.thumbnail
    }
}