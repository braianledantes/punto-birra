const cervezas = [
    {
        nombre: "APA",
        precio: 2500,
        imagen: "../../images/birra-apa.jpeg"
    },
    {
        nombre: "Golden",
        precio: 2200,
        imagen: "../../images/birra-golden.jpeg"
    },
    {
        nombre: "Honey",
        precio: 2500,
        imagen: "../../images/birra-honey.jpeg"
    },
    {
        nombre: "IPA",
        precio: 2500,
        imagen: "../../images/birra-ipa.jpeg"
    },
    {
        nombre: "Irish Sout",
        precio: 2400,
        imagen: "../../images/birra-irish-sout.jpeg"
    },
    {
        nombre: "Pandora Neipa",
        precio: 2600,
        imagen: "../../images/birra-pandora-neipa.jpeg"
    },
    {
        nombre: "Porter",
        precio: 2500,
        imagen: "../../images/birra-porter.jpeg"
    },
    {
        nombre: "Scottish",
        precio: 2400,
        imagen: "../../images/birra-scottish.jpeg"
    },
    {
        nombre: "Session IPA",
        precio: 2300,
        imagen: "../../images/birra-session-ipa.jpeg"
    }
]

function obtenerCarrito() {
    // recupera el carrito del local storage
    var carrito = localStorage.getItem("carrito");
    if (carrito == null) {
        carrito = [];
    } else {
        carrito = JSON.parse(carrito);
    }
    return carrito;
}

function guardarCarrito(carrito) {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function agregarAlCarrito(nombreBirra) {
    var carrito = obtenerCarrito();

    const birra = cervezas.find(birra => birra.nombre === nombreBirra);

    // si la cerveza está en el carrito, incrementa la cantidad
    const item = carrito.find(item => item.detalle === nombreBirra);
    if (item) {
        item.cantidad++;
        item.precio = item.cantidad * birra.precio;
    } else {
        // si no está, la agrega
        carrito.push({
            imagen: birra.imagen,
            detalle: birra.nombre,
            precio: birra.precio,
            cantidad: 1
        });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));

    alert("Cerveza agregada al carrito!");
}

function mostrarCarrito() {
    var carrito = obtenerCarrito();

    const tbody = document.getElementById("carrito");

    carrito.forEach(item => {
        tbody.innerHTML += `
        <tr class="item-carrito">
            <td class="item-img"><img src="${item.imagen}" alt="Cerveza,  ${item.detalle}"></td>
            <td align="left" class="item-detalle">
                <p>${item.detalle}</p>
            </td>
            <td class="item-cantidad">
                <input type="number" value="${item.cantidad}" min="1" onchange="modificarPrecioItem(this.parentNode.parentNode.rowIndex - 1)">
            </td>
            <td class="item-precio">
                $ ${item.precio}
            </td>
            <td class="item-opcion">
                <button class="btn-eliminar-item" onclick='eliminarItemCarrito(this.parentNode.parentNode.rowIndex - 1)'>Eliminar</button>
            </td>
        </tr>
        `;
    });

    mostrarTotal();
}

function eliminarItemCarrito(rowIndex) {
    const myTable = document.getElementById("carrito");
    myTable.deleteRow(rowIndex);

    var carrito = obtenerCarrito();
    carrito.splice(rowIndex, 1);

    guardarCarrito(carrito);

    mostrarTotal();
}

function modificarPrecioItem(rowIndex) {

    var carrito = obtenerCarrito();

    const birra = cervezas.find(birra => birra.nombre === carrito[rowIndex].detalle);

    // obtengo la cantidad
    const cantidadString = document.getElementsByClassName("item-cantidad")[rowIndex].children[0].value;

    // modifico la cantidad
    carrito[rowIndex].cantidad = parseInt(cantidadString);
    carrito[rowIndex].precio = carrito[rowIndex].cantidad * birra.precio;

    localStorage.setItem("carrito", JSON.stringify(carrito));

    // muestra el precio en la pagina
    document.getElementsByClassName("item-precio")[rowIndex].innerHTML = `$ ${carrito[rowIndex].precio}`;

    mostrarTotal();
}

function mostrarTotal() {
    var carrito = obtenerCarrito();

    // calcula el total
    var total = carrito.reduce((acc, item) => acc + item.precio, 0);

    document.getElementById("totalCarrito").innerHTML = `$ ${total}`;
}

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

    alert("Compra realizada con éxito!");

    localStorage.removeItem("carrito");

    // recarga la pagina
    window.location.reload();
}