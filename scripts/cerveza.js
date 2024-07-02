import { obtenerCerveza, agregarAlCarrito } from "./data.js";

// obtengo el nombre de la birra de la url
const urlParams = new URLSearchParams(window.location.search);
const idCerveza = parseInt(urlParams.get("id"));

// obtengo la seccion donde voy a agregar la info de la birra
const sectionCerveza = document.querySelector(".section-cerveza");

// obtengo la birra que corresponde al nombre
const cerveza = obtenerCerveza(idCerveza);

// agrego la info de la birra a la seccion
sectionCerveza.innerHTML = `
    <h2>${cerveza.nombre}</h2>

    <img src="${cerveza.imagen}" alt="vaso de birra de una ${cerveza.nombre}">

    <div class="cerveza-detalles">
        <p>
            La ${cerveza.nombre} es una cerveza de alta fermentación, de color ámbar, con un sabor y aroma a lúpulo muy
            marcado. Es una cerveza muy popular en los Estados Unidos y en otros países.
        </p>

        <div>
            <p><strong>Tipo:</strong> ${cerveza.nombre}</p>
            <p><strong>Graduacion alcoholica:</strong> 4° </p>
            <p><strong>Amargor:</strong> Fuerte</p>
            <p><strong>Precio:</strong> $${cerveza.precio}</p>
        </div>

        <button type="button" id="btnAgregarAlCarrito">Agregar al carrito</button>
    </div>
`;

// agrego el evento al boton de agregar al carrito
const btnAgregarAlCarrito = document.getElementById("btnAgregarAlCarrito");
btnAgregarAlCarrito.addEventListener("click", () => {
    agregarAlCarrito(cerveza.id);
});