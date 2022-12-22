const socket = io();

const renderProducto = (producto) => {
    const tableProductos = document.querySelector("#productos");
    const rowProducto = document.createElement("tr");

    const title = document.createElement("td");
    title.innerHTML = producto.title;
    rowProducto.appendChild(title);

    const price = document.createElement("td");
    price.innerHTML = producto.price;
    rowProducto.appendChild(price);

    const img = document.createElement("img");
    img.src = producto.thumbnail;
    img.alt = producto.title;
    img.height = "80";
    rowProducto.appendChild(img);

    tableProductos.appendChild(rowProducto);

}

//Esquemas mensajes
const autorSchema = new normalizr.schema.Entity('autor', {}, { idAttribute: 'email' });

const mensajeSchema = new normalizr.schema.Entity('post', {
    autor: autorSchema
}, { idAttribute: 'id' });

const mensajesSchema = new normalizr.schema.Entity('posts', {
    mensajes: [mensajeSchema]
}, { idAttribute: 'id' });

const renderMensaje = (data) => {
    const tableMensajes = document.querySelector("#mensajes");
    const rowMensaje = document.createElement("tr");

    const email = document.createElement("td");
    email.innerHTML = data.email;
    rowMensaje.appendChild(email);

    const nombre = document.createElement("td");
    nombre.innerHTML = data.nombre;
    rowMensaje.appendChild(nombre);

    const apellido = document.createElement("td");
    apellido.innerHTML = data.apellido;
    rowMensaje.appendChild(apellido);

    const edad = document.createElement("td");
    edad.innerHTML = data.edad;
    rowMensaje.appendChild(edad);

    const alias = document.createElement("td");
    alias.innerHTML = data.alias;
    rowMensaje.appendChild(alias);

    const avatar = document.createElement("td");
    avatar.innerHTML = data.avatar;
    rowMensaje.appendChild(avatar);

    const mensaje = document.createElement("td");
    mensaje.innerHTML = data.mensaje;
    rowMensaje.appendChild(mensaje);

    tableMensajes.appendChild(rowMensaje);

}

const addProducto = () => {
    const title = document.querySelector("#title").value;
    const price = document.querySelector("#price").value;
    const thumbnail = document.querySelector("#thumbnail").value;

    socket.emit("addProducto", {
        title,
        price,
        thumbnail,
    })

    return false;
}

const addMensaje = () => {
    const mensaje = document.querySelector("#mensaje").value;
    const email = document.querySelector("#email").value;
    const nombre = document.querySelector("#nombre").value;
    const apellido = document.querySelector("#apellido").value;
    const edad = document.querySelector("#edad").value;
    const alias = document.querySelector("#alias").value;
    const avatar = document.querySelector("#avatar").value;

    socket.emit("addMensaje", {
        mensaje,
        email,
        nombre,
        apellido,
        alias,
        avatar,
        edad
    })

    return false;
}

socket.on("nuevo_cliente_productos", (productos) => {
    productos.forEach(producto => {
        renderProducto(producto);
    })
});

socket.on("nuevo_cliente_chat", (chat) => {
    const tamanioNormalizado = JSON.stringify(chat).length;
    const mensajesDesnormalizados = normalizr.denormalize(chat.result, mensajesSchema, chat.entities);
    const tamanioDesnormalizado = JSON.stringify(mensajesDesnormalizados).length;
    console.log(tamanioNormalizado);
    console.log(tamanioDesnormalizado);
    let porcentaje = parseInt((1-tamanioNormalizado/tamanioDesnormalizado)*100);
    porcentaje = porcentaje || 0;
    document.getElementById("compresion").innerText = "Comprensión: " + porcentaje + "%";

    console.log(mensajesDesnormalizados)
    mensajesDesnormalizados.mensajes.forEach(mensaje => {
        renderMensaje(mensaje);
    })
});


socket.on("newProducto", producto => {
    renderProducto(producto);
});

socket.on("newMensaje", mensaje => {
    renderMensaje(mensaje);
});
