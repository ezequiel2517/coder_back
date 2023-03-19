module.exports = class UsuarioDTO {
    constructor(data) {
        this.username = data.username;
        this.password = data.password;
        this.nombre = data.nombre;
        this.direccion = data.direccion;
        this.edad = data.edad;
        this.phone = data.phone;
    };
};