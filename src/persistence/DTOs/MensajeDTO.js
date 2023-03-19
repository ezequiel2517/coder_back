module.exports = class MensajeDTO {
    constructor(data){
        this.id = data.id;
        this.mensaje = data.mensaje;
        this.email = data.email;
        this.nombre = data.nombre;
        this.apellido = data.apellido;
        this.alias = data.alias;
        this.avatar = data.avatar;
        this.edad = data.edad
    };
};