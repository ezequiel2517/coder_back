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

const renderMensaje = (data) => {
    const tableMensajes = document.querySelector("#mensajes");
    const rowMensaje = document.createElement("tr");

    const email = document.createElement("td");
    email.innerHTML = data.email;
    rowMensaje.appendChild(email);

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

    socket.emit("addMensaje", {
        mensaje,
        email
    })

    return false;
}

socket.on("nuevo_cliente_productos", (productos) => {
    productos.forEach(producto => {
        renderProducto(producto);
    })
});

socket.on("nuevo_cliente_chat", (chat) => {
    chat.forEach(mensaje => {
        renderMensaje(mensaje);
    })
});


socket.on("newProducto", producto => {
    renderProducto(producto);
});

socket.on("newMensaje", mensaje => {
    renderMensaje(mensaje);
});
