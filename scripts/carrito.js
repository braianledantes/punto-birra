import { agregarAlCarrito, eliminarDelCarrito, obtenerCarrito, vaciarCarrito } from "./data.js";

var carrito = obtenerCarrito();

const tbody = document.getElementById("carrito");

carrito.items.forEach(item => {
    const tr = document.createElement("tr");
    tr.classList.add("item-carrito");

    const tdImg = document.createElement("td");
    tdImg.classList.add("item-img");
    const img = document.createElement("img");
    img.src = item.imagen;
    img.alt = "Cerveza";
    tdImg.appendChild(img);
    tr.appendChild(tdImg);

    const tdDetalle = document.createElement("td");
    tdDetalle.classList.add("item-detalle");
    const p = document.createElement("p");
    p.textContent = item.nombre;
    tdDetalle.appendChild(p);
    tr.appendChild(tdDetalle);

    const tdCantidad = document.createElement("td");
    tdCantidad.classList.add("item-cantidad");
    const inputCant = document.createElement("input");
    inputCant.type = "number";
    inputCant.value = item.cantidad;
    inputCant.min = 1;
    inputCant.onchange = () => modificarPrecioItem(item.id, inputCant.value, tr.rowIndex);
    tdCantidad.appendChild(inputCant);
    tr.appendChild(tdCantidad);

    const tdPrecio = document.createElement("td");
    tdPrecio.classList.add("item-precio");
    tdPrecio.textContent = `$ ${item.precio}`;
    tr.appendChild(tdPrecio);

    const tdOpcion = document.createElement("td");
    tdOpcion.classList.add("item-opcion");
    const btnEliminar = document.createElement("button");
    btnEliminar.classList.add("btn-eliminar-item");
    btnEliminar.textContent = "Eliminar";
    btnEliminar.onclick = () => eliminarItemCarrito(item.id, tr.rowIndex);
    tdOpcion.appendChild(btnEliminar);

    tr.appendChild(tdOpcion);

    tbody.appendChild(tr);
});

mostrarTotal();


function eliminarItemCarrito(idCerveza, rowIndex) {
    const tbody = document.getElementById("carrito");
    tbody.deleteRow(rowIndex - 1);

    eliminarDelCarrito(idCerveza);

    mostrarTotal();
}

function modificarPrecioItem(idCerveza, cantidad, rowIndex) {
    // obtiene la cantidad ingresada
    cantidad = parseInt(cantidad);

    agregarAlCarrito(idCerveza, cantidad);

    mostrarTotal();
}

function mostrarTotal() {
    var carrito = obtenerCarrito();

    // calcula el total
    var total = carrito.total;

    document.getElementById("totalCarrito").innerHTML = `$ ${total}`;
}

// btn-comprar
document.getElementById("btnComprar").addEventListener("click", comprarCarrito);

function comprarCarrito() {
    // comprueba si hay usuario logueado
    const usuario = localStorage.getItem("usuario");
    if (!usuario) {
        alert("Debe iniciar sesión para realizar la compra");
        return;
    }

    // comprueba si hay items en el carrito
    var carrito = obtenerCarrito();
    if (carrito.length == 0) {
        alert("El carrito está vacío!");
        return;
    }

    if (!confirm("¿Desea confirmar la compra?")) {
        return;
    }

    // vacia el carrito de la base de datos
    vaciarCarrito();

    alert("Compra realizada con éxito!");

    localStorage.removeItem("carrito");

    // recarga la pagina
    window.location.reload();
}