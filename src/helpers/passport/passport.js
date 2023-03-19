const passport = require("passport");
const Strategy = require("passport-local");
const bcrypt = require("bcrypt");
const { registrarUsuario, obtenerUsuario } = require("../../services/servicesUsuarios.js")

//Registro
passport.use("registro", new Strategy({ passReqToCallback: true }, async (req, username, password, done) => {
    const usuarioExiste = await obtenerUsuario(username);
    if (!usuarioExiste) {
        const { nombre, direccion, edad, phone } = req.body;
        await registrarUsuario(username, password, nombre, direccion, edad, phone)
        done(null, { username, password });
    }
    else {
        done(null, false);
    }
}));

//Login
passport.use("login", new Strategy(async (username, password, done) => {
    const usuarioExiste = await obtenerUsuario(username);

    if (usuarioExiste)
        bcrypt.compare(password, usuarioExiste.password, (error, res) => {
            if (error) throw error;
            if (res)
                done(null, usuarioExiste);
            else 
                done(null, false);
        })
    else
        done(null, false);
}));

passport.serializeUser((user, done) => {
    done(null, user.username);
})

passport.deserializeUser(async (username, done) => {
    const user = await obtenerUsuario(username);
    done(null, user);
})

module.exports = passport;