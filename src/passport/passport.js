//Importo passport
const passport = require("passport");
const Strategy = require("passport-local");

//Persistencia de usuarios en Mongo Atlas
const Contenedor_Atlas = require("../contenedor/contenedor_Atlas/contenedor_Atlas.js");
const usuarios = new Contenedor_Atlas("../schemas/schemaUsuario.js");

//Registro
passport.use("register", new Strategy(async (username, password, done) => {
    const usuarioExiste = await usuarios.findByField("username", username);

    if (!usuarioExiste) {
        const nuevoUsuario = { username, password };
        await usuarios.save(nuevoUsuario);
        return done(null, nuevoUsuario);
    }

    return done(null, false);
}));

//Login
passport.use("login", new Strategy(async (username, password, done) => {
    const usuarioExiste = await usuarios.findByField("username", username);
    
    if (usuarioExiste && usuarioExiste.password == password) {
        return done(null, usuarioExiste);
    }

    return done(null, false);
}));

//Serializar y deserealizar usuarios
passport.serializeUser((user, done) => {
    done(null, user.username);
})

passport.deserializeUser(async (username, done) => {
    const user = await usuarios.findByField("username", username);
    done(null, user);
})

module.exports = passport;