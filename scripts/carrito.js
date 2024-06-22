const cervezas = [
    {
        nombre: "APA",
        precio: 100,
        imagen: "../../images/birra-apa.jpeg"
    },
    {
        nombre: "Golden",
        precio: 200,
        imagen: "../../images/birra-golden.jpeg"
    },
    {
        nombre: "Honey",
        precio: 150,
        imagen: "../../images/birra-honey.jpeg"
    },
    {
        nombre: "IPA",
        precio: 100,
        imagen: "../../images/birra-ipa.jpeg"
    },
    {
        nombre: "Irish Sout",
        precio: 200,
        imagen: "../../images/birra-irish-sout.jpeg"
    },
    {
        nombre: "Pandora Neipa",
        precio: 150,
        imagen: "../../images/birra-pandora-neipa.jpeg"
    },
    {
        nombre: "Porter",
        precio: 150,
        imagen: "../../images/birra-porter.jpeg"
    },
    {
        nombre: "Scottish",
        precio: 100,
        imagen: "../../images/birra-scottish.jpeg"
    },
    {
        nombre: "Session IPA",
        precio: 200,
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
    // guarda el carrito en el local storage
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function agregarAlCarrito(nombreBirra) {
    // recupera el carrito del local storage
    var carrito = obtenerCarrito();

    // busca la cerveza en la lista
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

    // guarda el carrito en el local storage
    localStorage.setItem("carrito", JSON.stringify(carrito));

    // muestra el carrito en consola
    console.log(carrito);

    // muestra un alert con el mensaje de cerveza agregada
    alert("Cerveza agregada al carrito!");
}

function mostrarCarrito() {

    // recupera el carrito del local storage
    var carrito = obtenerCarrito();
    // muestra el carrito en consola
    console.log(carrito);

    // muestra el carrito en la página
    const tbody = document.getElementById("carrito");

    carrito.forEach(item => {
        tbody.innerHTML += `
        <tr class="item-carrito">
            <td align="center" class="item-img"><img src="${item.imagen}" alt="Cerveza"></td>
            <td align="left" class="item-detalle">
                <p>${item.detalle}</p>
            </td>
            <td align="right" class="item-cantidad">
                <input type="number" value="${item.cantidad}" min="1" onchange="modificarPrecioItem(this.parentNode.parentNode.rowIndex - 1)">
            </td>
            <td align="right" class="item-precio">
                $ ${item.precio}
            </td>
            <td align="center" class="item-opcion">
                <button class="btn-eliminar-item" onclick='eliminarItemCarrito(this.parentNode.parentNode.rowIndex - 1)'>Eliminar</button>
            </td>
        </tr>
        `;
    });

    // muestra el total en la pagina
    mostrarTotal();
}

function eliminarItemCarrito(rowIndex) {
    const myTable = document.getElementById("carrito");
    myTable.deleteRow(rowIndex);
    // elimina el item del carrito
    var carrito = obtenerCarrito();
    carrito.splice(rowIndex, 1);

    // guarda el carrito en el local storage
    guardarCarrito(carrito);

    // muestra el carrito en consola
    console.log(carrito);
    
    // muestra el total en la página
    mostrarTotal();
}

// funcion para que cuando aumente la cantidad modifique el precio
function modificarPrecioItem(rowIndex) {

    // recupera el carrito del local storage
    var carrito = obtenerCarrito();

    // obtengo la cerveza segun el nombre
    const birra = cervezas.find(birra => birra.nombre === carrito[rowIndex].detalle);

    // obtengo la cantidad
    const cantidadString = document.getElementsByClassName("item-cantidad")[rowIndex].children[0].value;

    // modifico la cantidad
    carrito[rowIndex].cantidad = parseInt(cantidadString);
    carrito[rowIndex].precio = carrito[rowIndex].cantidad * birra.precio;

    // guarda el carrito en el local storage
    localStorage.setItem("carrito", JSON.stringify(carrito));

    // muestra el carrito en consola
    console.log(carrito);

    // muestra el precio en la pagina
    document.getElementsByClassName("item-precio")[rowIndex].innerHTML = `$ ${carrito[rowIndex].precio}`;

    // muestra el total en la pagina
    mostrarTotal();
}

function mostrarTotal() {
    // recupera el carrito del local storage
    var carrito = obtenerCarrito();

    // calcula el total
    var total = carrito.reduce((acc, item) => acc + item.precio, 0);

    // muestra el total en la página
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
        // si no hay items, muestra un alert con el mensaje de carrito vacío
        alert("El carrito está vacío!");
        return;
    }

    if (!confirm("¿Desea confirmar la compra?")) {
        return;
    }

    // muestra un alert con el mensaje de compra realizada
    alert("Compra realizada con éxito!");

    // limpia el carrito
    localStorage.removeItem("carrito");
    // redirige a la página de compra
    window.location.reload();
}