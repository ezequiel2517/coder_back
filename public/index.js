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

socket.on("nuevo_cliente", data => {
    data.forEach(producto => {
        renderProducto(producto);
    })
});

socket.on("newProducto", producto => {
    renderProducto(producto);
});
